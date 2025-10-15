#!/bin/bash
# Script: setup-vps-full.sh
# Propósito: Configurar Debian 12 VPS con XFCE, xRDP, navegador, VS Code, Nginx, seguridad avanzada (CrowdSec, Fail2Ban, UFW) y utilidades
# Autor: Consolidado y extendido por ChatGPT

set -e

echo "🚀 Actualizando sistema e instalando paquetes base..."
apt update
apt install -y xfce4 xfce4-goodies xorg dbus-x11 x11-xserver-utils xrdp \
               gnome-keyring libsecret-1-0 seahorse wget apt-transport-https exo-utils firefox-esr \
               git curl php php-cli php-mbstring php-xml php-curl php-zip php-json \
               nginx fail2ban btop neofetch python3-pip ufw

echo "✅ XFCE, xRDP, navegador, PHP, Nginx, seguridad y herramientas básicas instaladas."

# Configurar XFCE como entorno por defecto de xRDP
echo "startxfce4" > ~/.xsession
sed -i 's|^test -x /etc/X11/Xsession.*|. /etc/X11/Xsession\nstartxfce4|' /etc/xrdp/startwm.sh
systemctl enable --now xrdp
systemctl restart xrdp
echo "✅ xRDP configurado para iniciar XFCE."

# Instalar VS Code
echo "🚀 Configurando repositorio de VS Code..."
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor | tee /etc/apt/trusted.gpg.d/microsoft.gpg > /dev/null
echo "deb [arch=amd64] https://packages.microsoft.com/repos/code stable main" | tee /etc/apt/sources.list.d/vscode.list
apt update
apt install -y code
echo "✅ VS Code instalado."

# Instalar Node.js (v18 LTS) y Angular CLI
echo "🚀 Instalando Node.js y Angular CLI..."
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
npm install -g @angular/cli
echo "✅ Node.js y Angular CLI instalados."

# Configurar keyring para sesiones xRDP
USER_ID=$(id -u)
USER_NAME=$(whoami)
RUNTIME_DIR="/run/user/$USER_ID"
export XDG_RUNTIME_DIR="$RUNTIME_DIR"

if [ ! -d "$RUNTIME_DIR" ]; then
    echo "Creando directorio $RUNTIME_DIR para keyring..."
    mkdir -p "$RUNTIME_DIR"
    chown "$USER_ID:$USER_ID" "$RUNTIME_DIR"
    chmod 700 "$RUNTIME_DIR"
fi

# Configurar autoinicio de gnome-keyring en XFCE
XPROFILE="$HOME/.xprofile"
touch "$XPROFILE"
if ! grep -q "gnome-keyring-daemon" "$XPROFILE"; then
    echo "Añadiendo gnome-keyring-daemon a ~/.xprofile..."
    cat <<EOF >> "$XPROFILE"
# Iniciar gnome-keyring al iniciar sesión XFCE
export XDG_RUNTIME_DIR=/run/user/\$(id -u)
eval \$(gnome-keyring-daemon --start --components=secrets,ssh)
export SSH_AUTH_SOCK
EOF
fi

# Lanzar keyring en la sesión actual
echo "Iniciando gnome-keyring-daemon en esta sesión..."
eval $(gnome-keyring-daemon --start --components=secrets,ssh)
export SSH_AUTH_SOCK

# Crear lanzador de VS Code sin sandbox
tee /usr/share/applications/code-nosandbox.desktop > /dev/null <<EOF
[Desktop Entry]
Name=Visual Studio Code (No Sandbox)
Comment=Code Editing. Redefined.
Exec=/usr/share/code/code --no-sandbox %F
Icon=code
Type=Application
StartupNotify=true
Categories=Utility;TextEditor;Development;IDE;
EOF
echo "✅ Lanzador VS Code (No Sandbox) creado."

# Añadir neofetch al inicio de sesión
if ! grep -q "neofetch" ~/.bashrc; then
    echo "" >> ~/.bashrc
    echo "# Mostrar información del sistema al iniciar sesión" >> ~/.bashrc
    echo "neofetch" >> ~/.bashrc
fi

# Activar servicios base
systemctl enable --now nginx
systemctl enable --now fail2ban
echo "✅ Nginx y Fail2Ban activos."

# Instalar y configurar CrowdSec
echo "🚀 Instalando CrowdSec..."
curl -s https://install.crowdsec.net | bash
apt install -y crowdsec-firewall-bouncer-nftables

echo "✅ CrowdSec instalado. Generando API key para el bouncer..."
API_KEY=$(cscli bouncers add firewall-bouncer -o raw)

cat >/etc/crowdsec/bouncers/crowdsec-firewall-bouncer.yaml <<EOF
api_url: http://127.0.0.1:8080/
api_key: $API_KEY
update_frequency: 10s
daemon: true
EOF

systemctl enable --now crowdsec
systemctl enable --now crowdsec-firewall-bouncer

echo "✅ CrowdSec y bouncer configurados correctamente."

# Hardening SSH
echo "🔒 Endureciendo SSH..."
sed -i 's/^#*PermitRootLogin.*/PermitRootLogin no/' /etc/ssh/sshd_config
sed -i 's/^#*PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#*ChallengeResponseAuthentication.*/ChallengeResponseAuthentication no/' /etc/ssh/sshd_config
sed -i 's/^#*X11Forwarding.*/X11Forwarding no/' /etc/ssh/sshd_config
echo "✅ SSH endurecido. Asegúrate de usar autenticación por clave."

# Configurar UFW
echo "🧱 Configurando firewall..."
ufw --force reset
ufw default deny incoming
ufw default allow outgoing
ufw allow 22/tcp
ufw allow 80,443/tcp
ufw --force enable
echo "✅ UFW activo y configurado."

echo "🎯 Instalación completa. VPS seguro y listo."
echo "👉 CrowdSec + Fail2Ban protegen el servidor frente a fuerza bruta y abusos."
echo "👉 SSH endurecido, firewall activo y entorno de trabajo completo instalado."
