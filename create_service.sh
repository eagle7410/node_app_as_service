#!/usr/bin/env bash
# systemctl daemon-reload
# systemctl enable testApp
# systemctl restart testApp

cat > /lib/systemd/system/testApp.service  <<EOF
[Unit]
Description=LTPS NodeJS Test Application
After=network-online.target

[Service]
Restart=always
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=testApp
WorkingDirectory=/home/igor/projects/Test_as_service
ExecStart=/usr/bin/node entry.app.js --color=always
Environment=NODE_ENV=production
Type=simple

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable testApp
systemctl restart testApp
