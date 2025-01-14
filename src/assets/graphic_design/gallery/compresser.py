import os
from PIL import Image


def getpngs(folder_path, output_folder, quality=85):
    """
    Compress all PNG and JPG images in a folder.

    :param folder_path: Path to the folder containing images
    :param output_folder: Path to the output folder for compressed images
    :param quality: Compression quality (1-100), higher means better quality
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, _, files in os.walk(folder_path):
        for file in files:
            file:str = file
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):

                file_path = os.path.join(root, file)
                output_path = os.path.join(output_folder, file.removesuffix('.png'))

                try:
                    with Image.open(file_path) as img:
                        # Convert PNGs to RGB if they have an alpha channel

                        img = img.convert('RGB')
                        img.save(output_path + (".jpg" if not file.endswith('.jpg') else "" ), 'JPEG')
                except Exception as e:
                    print(f"Failed to process {file_path}: {e}")



def compress_images_in_folder(folder_path, output_folder, quality=85):
    """
    Compress all PNG and JPG images in a folder.

    :param folder_path: Path to the folder containing images
    :param output_folder: Path to the output folder for compressed images
    :param quality: Compression quality (1-100), higher means better quality
    """
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    for root, _, files in os.walk(folder_path):
        for file in files:
            if file.lower().endswith(('.png', '.jpg', '.jpeg')):
                file_path = os.path.join(root, file)
                output_path = os.path.join(output_folder, file)

                try:
                    with Image.open(file_path) as img:

                        if img.mode == 'RGBA':
                            img = img.convert('RGB')

                        # Save the image with specified quality
                        img.save(output_path, optimize=True, quality=quality)
                        file_size_kb_before = os.path.getsize(file_path) / 1024
                        file_size_kb_after = os.path.getsize(output_path) / 1024
                        print(f"{file} Compressed: {file_size_kb_before} -> {file_size_kb_after}")
                except Exception as e:
                    print(f"Failed to process {file_path}: {e}")

# Example usage
source_folder = "books"  # Change this to your folder path
destination_folder = f"{source_folder}_compressed"  # Change this to your output folder

getpngs(source_folder, destination_folder)
compress_images_in_folder(destination_folder, destination_folder, quality=50)
