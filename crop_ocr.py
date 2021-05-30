"""
  crop pic, then ocr.
"""
import PIL
from PIL import Image, ImageEnhance
import os
import easyocr
from typing import List, Tuple

start_dir = r"/home/user/photos/"


def get_fps(directory: str) -> Tuple[List[str], List[str]]:
    all_files_name = []
    all_files_path = []
    for filename in os.listdir(directory):
        if filename.endswith(".jpg"):
            file_path = os.path.join(directory, filename)
            all_files_name.append(filename)
            all_files_path.append(file_path)
    return all_files_path, all_files_name


# 读入文件
def get_img_objs(all_files_path: List[str]) -> List[PIL.Image.Image]:
    return [Image.open(file_path) for file_path in all_files_path]


# 目录下的文件路径，文件名
files_path_list, files_name_list = get_fps(start_dir)

img_obj_list = get_img_objs(files_path_list)


def preproc_imgs(imgs_obj_list: List[PIL.Image.Image]) -> List[str]:
    # crop then enhance the image
    crop_box = (275, 520, 600, 565)
    w_dir = r'/home/user/photos/output'
    fps = []
    for index, img in enumerate(imgs_obj_list[:-1]):
        after_crop = img.crop(crop_box)
        after_enhance = ImageEnhance.Brightness(ImageEnhance.Contrast(after_crop).enhance(2)).enhance(1.2)
        fp = os.path.join(w_dir, files_name_list[index])
        after_enhance.save(fp)
        fps.append(fp)
    return fps


pre_img_fps = preproc_imgs(img_obj_list)


def ocr_quantity(fps):
    res = []
    for fp in fps:
        reader = easyocr.Reader(['en'], gpu=True)
        amount = reader.readtext(fp, detail=0)
        res.append(amount)
    print(res)


ocr_quantity(pre_img_fps)
