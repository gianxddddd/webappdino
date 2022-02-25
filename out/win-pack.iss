[Setup]
AppPublisher=GianXD
AppPublisherURL=https://gianxd.rf.gd/
AppCopyright=Copyright (c) GianXD and The Chromium Authors
AppId=wadinst
AppName=webappdino
AppVersion=1.0.0
AppVerName=webappdino
ArchitecturesAllowed=x64
ArchitecturesInstallIn64BitMode=x64
Compression=zip
PrivilegesRequired=admin
DefaultDirName={sd}\Program Files\webappdino
DefaultGroupName=webappdino
DisableWelcomePage=false
DisableReadyPage=false
SetupIconFile=compiler:SetupClassicIcon.ico
OutputDir=..\dist
OutputBaseFilename=wad-win64
UninstallDisplayName=webappdino
UninstallDisplayIcon=..\out\icon.ico
VersionInfoOriginalFileName=wadinst
VersionInfoVersion=1.0.0
WizardImageFile=win-pack-banner-large.bmp
WizardSmallImageFile=win-pack-banner-small.bmp
WizardStyle=modern

[Tasks]
Name: desktopicon; Description: "Create a desktop icon"

[Files]
Source: "..\dist\win-unpacked\*"; DestDir: "{app}"; Flags: recursesubdirs

[Icons]
Name: "{userdesktop}\Dino"; Filename: "{app}\webappdino.exe"; WorkingDir: "{app}"; Tasks: desktopicon

[Run]
Filename: "{app}\webappdino.exe"; Description: "Launch application"; Flags: postinstall nowait skipifsilent