import ctypes
import os
import struct
from random import randint
import winreg
from time import sleep

wallpaper_position_options = {
    'STRETCH': {
        'wallpaperStyle': 2,
        'tileWallpaper': 0
    },
    'CENTER': {
        'wallpaperStyle': 1,
        'tileWallpaper': 0
    },
    'FIT': {
        'wallpaperStyle': 6,
        'tileWallpaper': 0
    },
    'FILL': {
        'wallpaperStyle': 10,
        'tileWallpaper': 0
    }
}


class WallpaperOperation:
    SPI_SETDESKWALLPAPER = 20

    def __init__(self, file_directory: str, fill_mode: str = 'fit'):
        if not file_directory or not os.path.exists(file_directory):
            raise FileExistsError('Invalid file path.')
        self.file_directory: str = file_directory
        self.fill_mode: str = fill_mode

    def set_wallpaper(self):
        self.set_wallpaper_content()
        self.set_wallpaper_position()

    def set_wallpaper_content(self):
        random_file_path = os.path.join(self.file_directory, self.get_random_file_path())
        WallpaperOperation.change_wallpaper(random_file_path)

    def set_wallpaper_position(self):
        # according to the fill mode, get the specific values that should be set to the registry key.
        wallpaper_position = wallpaper_position_options[self.fill_mode.upper()]
        access_registry = winreg.ConnectRegistry(None, winreg.HKEY_CURRENT_USER)
        access_key = winreg.OpenKey(access_registry, r'Control Panel\Desktop', access=winreg.KEY_SET_VALUE)
        winreg.SetValueEx(access_key, r'TileWallpaper', 0, winreg.REG_SZ, str(wallpaper_position.get('tileWallpaper')))
        winreg.SetValueEx(access_key, r'WallpaperStyle', 0, winreg.REG_SZ,
                          str(wallpaper_position.get('wallpaperStyle')))
        winreg.FlushKey(access_key)
        winreg.CloseKey(access_key)

    def get_random_file_path(self):
        all_images_name = self.get_all_images_name_in_current_directory()
        return os.path.join(self.file_directory, all_images_name[randint(0, len(all_images_name) - 1)])

    def get_all_images_name_in_current_directory(self):
        return [filename for filename in os.listdir(self.file_directory) if
                filename.endswith(('.png', '.jpg', '.jpeg', '.tiff', '.bmp', '.gif'))]

    @staticmethod
    def is_64_windows():
        """Find out how many bits is OS. """
        return struct.calcsize('P') * 8 == 64

    @staticmethod
    def get_sys_parameters_info():
        """Based on if this is 32bit or 64bit returns correct version of SystemParametersInfo function. """
        return ctypes.windll.user32.SystemParametersInfoW if WallpaperOperation.is_64_windows() \
            else ctypes.windll.user32.SystemParametersInfoA

    @staticmethod
    def change_wallpaper(file_path):
        sys_parameters_info = WallpaperOperation.get_sys_parameters_info()
        r = sys_parameters_info(WallpaperOperation.SPI_SETDESKWALLPAPER, 0, file_path, 3)
        if not r:
            print(ctypes.WinError())


WALLPAPER_DIRECTORY = r'D:\Pictures\bg\'
main_task = WallpaperOperation(WALLPAPER_DIRECTORY, 'stretch')
interval_time = 60 * 60 * 2
while True:
    sleep(interval_time)
    main_task.set_wallpaper()
