# SERVER SETUP

# Index

- [UBUNTU UPDATE UPGRADE](#ubuntu-update)
- [SETTING STATIC IP](#setting-static-ip)
- [AUTOLOGIN](#autologin)
- [SSH CONNECTION](#ssh-connection)
  - [Prerequisiti](#prerequisiti)
    - [UFW](#ufw)
  - [Enabling](#enabling)
  - [Connection from pc](#connection-from-pc)
- [SD CARD BACKUP](#sd-card-backup)
- [COMMAND LINE](#command-line)
  - [SUDO](#sudo)
  - [NANO EDITOR](#nano-editor)

# UBUNTU UPDATE E UPGRADE

> This guide provides a series of commands to use to update and upgrade the Ubuntu operating system.

First, we clean the local package cache:

```
sudo apt-get clean
```

Next, we need to download the updated list of packages and new versions available in the repositories. This command only retrieves information, but does not install anything in concrete:

```
sudo apt-get update
```

The main command is the following, as it downloads and installs the latest versions of packages, dependencies, and possibly the most recent kernel. In any case, it never performs a version upgrade:

```
sudo apt-get dist-upgrade -y
```

Alternatively, if needed, you can perform a version upgrade, moving to the next Ubuntu release:

```
sudo do-release-upgrade
```

Finally, you can remove all outdated and unnecessary packages:

```
sudo apt-get autoremove -y
```

# SETTING STATIC IP

To manually set the IP address of your Ethernet network card on your Raspberry Pi 4, you can access the network-config configuration file on the SD card of your Raspberry Pi 4 from a Windows PC by following these steps:

- Insert the SD card into your PC.
- Open File Explorer and locate the SD card.
- Navigate to the folder where the network-config file is located.

  > The network-config file is a configuration file for the Raspberry Pi's network card that is used to set the IP address and other network options. This file uses a specific syntax and is executed at system boot time.

- Right-click on the file and select "Open with" and choose a text editor such as Notepad or WordPad.
  You should see the following if you're using Ubuntu:

```
# This file contains a netpan-compatible configuration wich cloud-init
# will apply on firt-boot. Please refer to the cloud-init documentation and
# the netplan reference for full details:
#
# https://cloudinit.readthedocs.io/
# https://netplan.io/reference
#
# Some additional examples are commented out below

version: 2
ethernets:
  eth0:
    dhcp4: true
    optional: true
#wifis:
#  wlan0:
#       dhcp4: true
#       optional: true
#       access-points:
#         myhomewifi:
#           password: "S3kr1t"
#         myworkwifi:
#           password: "correct battery horse staple"
#         workssid:
#           auth:
#             key-management: eap
#             method: peap
#             identity: "me@example.com"
#             password: "passw0rd"
#             ca-certificate: /etc/my_ca.pem
```

- Locate the network adapter to your desired connection, you shoud see dhcph4 is set to true but to configure static IP needs to remove or edit dhcp4 line. Edit the file by inserting the following lines to set the static IP address:

```
#[...]
#
# Some additional examples are commented out below

version: 2
ethernets:
    eth0:
        dhcp4: no
        addresses:
[192.168.1.254/24]
        gateway4: 192.168.1.1
        nameservers:
            addresses:
[8.8.8.8, 8.8.4.4]
optional: true
#wifis:
#  wlan0:
#       dhcp4: true
#       optional: true
#[...]
```

In this example, the static IP address is set to 192.168.1.254 with a subnet mask of /24, the default gateway is set to 192.168.1.1, and Google DNS servers are used as DNS resolvers.
Note that "dhcp4" indicates that the Dynamic Host Configuration Protocol (DHCP) is not used to obtain the IP address dynamically but is instead manually set with the "addresses" option.

- Save the changes and close the configuration file.
  > It is important to save the file with the name "network-config" in the root directory of the SD card, as this is the file name used by the Raspberry Pi operating system to read network settings during boot.

## Notes:

The "nameservers: addresses: [8.8.8.8, 8.8.4.4]" part indicates that Google DNS servers have been set as DNS resolvers for the Raspberry Pi. When a device connects to the internet, it uses a DNS resolver to translate domain names (e.g. www.google.com) into corresponding IP addresses that identify the web servers. In this case, the two specified IP addresses (8.8.8.8 and 8.8.4.4) belong to Google DNS servers. In other words, the Raspberry Pi will use these servers to resolve domain names into IP addresses when necessary. Other DNS resolvers can be used if needed by modifying the values in the "addresses" option.

> There are many other DNS resolvers besides Google's that can be used. Some examples are:
>
> - OpenDNS (208.67.222.222, 208.67.220.220)
> - Cloudflare DNS (1.1.1.1, 1.0.0.1)
> - Quad9 (9.9.9.9, 149.112.112.112)
> - Level3 DNS (4.2.2.1, 4.2.2.2)

However, the choice of which DNS resolver to use depends on one's needs and geographical location. It is recommended to do an online search to find the DNS resolver that best meets one's needs.

# AUTOLOGIN

By running the following commands we will create a folder and a file in a specific directory in the Linux operating system, to allow us to configure automatic user login on tty1 of the system for the "ubuntu" user.

Navigate to the path `/etc/systemd/system`:

```
$ cd /etc/systemd/system
```

Now, inside the systemd directory, we create a folder called `getty@tty1.service.d`:

```
$ mkdir getty@tty1.service.d
```

Navigating inside the newly created folder:

```
$ cd getty@tty1.service.d
```

Now create a file called : `autologin.conf` :

```
$ touch autologin.conf
```

In file created write this content:

```
[Service]
ExecStart=
ExecStart=-/sbin/agetty -o '-p -f -- \\u' --noclear --autologin ubuntu - $TERM
```

## VERIFY CONFIGURATION

To verify that the autologin configuration on tty1 of your Ubuntu server installed on Raspberry Pi is working correctly, you can follow these steps:

1. Check the status of the tty1 getty service with the following command:

```
systemctl status getty@tty1.service
```

2. If the service is active, you should see an output similar to this:

```
● getty@tty1.service - Getty on tty1 Loaded: loaded (/lib/systemd/system/getty@.service; enabled; vendor preset: enabled) Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago Docs: man:agetty(8) man:systemd-getty-generator(8) https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/ Main PID: 1234 (agetty) Tasks: 1 (limit: 4915) Memory: 272.0K CGroup: /system.slice/system-getty.slice/getty@tty1.service └─1234 /sbin/agetty --autologin NOME_UTENTE --noclear %I $TERM
```

Make sure the service is "active (running)" and shows the autologin option that you have inserted. 3. Check the status of the systemd service with the following command:

```
systemctl status systemd-logind.service
```

4. If the service is active, you should see an output similar to this:

```
● systemd-logind.service - Login Service Loaded: loaded (/lib/systemd/system/systemd-logind.service; static; vendor preset: enabled) Active: active (running) since Mon 2023-05-01 12:00:00 CEST; 3 days ago Docs: man:systemd-logind.service(8) man:logind.conf(5) https://www.freedesktop.org/wiki/Software/systemd/catalog/daemons/ https://www.freedesktop.org/wiki/Software/systemd/multiseat/ Main PID: 1234 (systemd-logind) Tasks: 1 (limit: 4915) Memory: 1.1M CGroup: /system.slice/systemd-logind.service └─1234 /lib/systemd/systemd-logind
```

# SSH CONNECTION

## Prerequisiti

### UFW

UFW (Uncomplicated Firewall) is a firewall configuration utility provided with Ubuntu. However, it is not always installed by default on all Ubuntu systems. To check if UFW is already installed on your Ubuntu system, you can use the command:

```
sudo ufw status

```

If UFW is already installed and enabled on your system, you will see output similar to this:

```

Status: active

```

Otherwise, you will see a message indicating that UFW is currently not enabled or installed. In this case, you can install it using the command:

```

sudo apt install ufw

```

## Enabling

To enable SSH on Ubuntu Server, act as root or a user with sudo privileges to install and enable SSH on your Ubuntu system, follow these steps:

Install the openssh-server package:

```
sudo apt update
sudo apt install openssh-server
```

Upon installation completion, the SSH service will be automatically started. You can verify if SSH is working by typing:

```

sudo systemctl status ssh

```

Ubuntu comes with a firewall configuration utility called UFW. If your system has a firewall enabled, make sure to open the SSH port:

```

sudo ufw allow ssh

```

## Connection from pc

    ssh utente@ip -p porta
    utente@ip -p porta's password:
    Welcome to Ubuntu 21.10 (GNU/Linux 5.13.0-1011-raspi aarch64)

    - Documentation: https://help.ubuntu.com
    - Management: https://landscape.canonical.com
    - Support: https://ubuntu.com/advantage

      System information as of Mon Feb 7 11:46:29 CET 2022

      System load: 0.02
      Usage of /: 30.1% of 29.34GB
      Memory usage: 38%
      Swap usage: 0%
      Temperature: 38.0 C
      Processes: 217
      Users logged in: 3
      IPv4 address for docker0: 172.17.0.1
      IPv4 address for eth0: 192.168.1.60
      IPv6 address for eth0: 2001:b07:2ec:f92a:dea6:32ff:fea0:5b17
      IPv4 address for tun0: 10.8.0.1

    0 updates can be applied immediately.

# SD CARD BACKUP

SALVA Backup

POSIZIONI CONNESSE:
`diskutil list `
PROCESSI ATTIVI
`ps aux | grep dd `  
CON NUMERO PROCESSO TROVATO PRECEDENTEMENTE CONTROLLO DATI TRASFERITI
`sudo kill -INFO 1821`

Ripristino SD dall'immagine di backup

`/Users/Ari/Zion_Backup/zion23_2.img`

# COMMAND LINE

## SUDO

| Command                              | Description                                                                    |
| ------------------------------------ | ------------------------------------------------------------------------------ |
| sudo su                              | Starts a shell as the root user.                                               |
| cp [source] [destination]            | Copies the specified file or directory to the specified destination.           |
| mv [source] [destination]            | Moves or renames the specified file or directory to the specified destination. |
| rm [file/directory]                  | Deletes the specified file or directory.                                       |
| mkdir [directory]                    | Creates a new directory with the specified name.                               |
| cd [directory]                       | Changes the current directory to the specified directory.                      |
| ls                                   | Lists the files and directories in the current directory.                      |
| ls -l                                | Lists the files and directories in the current directory in a detailed format. |
| pwd                                  | Displays the current directory path.                                           |
| chown [user:group] [file/directory]  | Changes the owner and group of the specified file or directory.                |
| chmod [permissions] [file/directory] | Changes the access permissions of the specified file or directory.             |

Please note that using sudo and sudo su can be risky if not used correctly, so make sure to only execute these commands if you are confident in what you are doing and have the necessary privileges to do so.

## NANO EDITOR

Nano is a command-line text editor, mainly used on Linux and Unix systems. Essentially, Nano is a tool that allows you to edit the contents of text files directly from the terminal.
You can use Nano to modify configuration files, scripts, text documents, and any other type of text file. The editor is very useful for those who work on Linux servers and do not have access to a graphical interface for file editing.
HOW TO USE NANO
To enter edit mode, simply open a file with Nano and start typing. When you're done editing the file, you can save and close it by pressing Ctrl + X, followed by Y to confirm the save and then Enter to confirm the file name. To close the file without saving any changes, press Ctrl + X, followed by N.

|                     Command                     |                                        Description                                         |
| :---------------------------------------------: | :----------------------------------------------------------------------------------------: |
|                   nano [file]                   |                        Opens the specified file in Nano for editing                        |
|                    Ctrl + G                     |                             Displays Nano's help documentation                             |
|                    Ctrl + X                     |               Closes the file being edited and prompts to save, if necessary               |
|                    Ctrl + O                     |                                   Saves the edited file                                    |
|                    Ctrl + R                     |                            Inserts a file into the current file                            |
|                    Ctrl + W                     |                           Searches for a string within the file                            |
|                    Ctrl + K                     |                                   Cuts the current line                                    |
|                    Ctrl + U                     |                               Pastes the previously cut line                               |
|                    Ctrl + J                     |                           Justifies the text on the current line                           |
|                     Alt + U                     |                                Undoes the last modification                                |
|                     Alt + E                     |                            Redoes the last undone modification                             |
|                     Alt + A                     |                              Selects all the text in the file                              |
|                     Alt + 6                     |                       Toggles commenting on/off for the current line                       |
|                    Ctrl + C                     |                       Displays the cursor's position within the file                       |
|                    Ctrl + \_                    |                       Inserts a specific character (in octal format)                       |
| Ctrl + \|Goes to the specified line in the file |
|                    Ctrl + T                     |                Allows for a find-and-replace operation throughout the file                 |
|                    Ctrl + V                     | Switches to Nano's visual menu, where text can be cut, copied, and pasted using the mouse. |

```

```
