import React, {useEffect, useState} from "react";

export function Picture({ folder, fileName }) {
    const image = `./${folder}/${fileName}`

    return <img src={image} style={{width: "100%"}} alt="Loaded content" />;
}

export function PictureGallery({ folder }) {
    const [images, setImages] = useState([]);


    useEffect(() => {
        async function loadImages() {
            const imageModules = import.meta.glob('/src/assets/**/*.{jpg,JPG,png,PNG,gif,GIF,svg,SVG}');
            const imagePromises = Object.entries(imageModules).filter(([path]) => path.includes(`/${folder}/`)).map(([_, loader]) => loader());
            const loadedModules = await Promise.all(imagePromises);
            const loadedImages = loadedModules.map(module => module.default);
            setImages(loadedImages);
        }
        loadImages();
    }, [folder]);

    return (
        <div className="imageContainer">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    style={{ width: 'fit-content', height: '230px', margin: '10px', objectFit: 'cover' }}
                />
            ))}
        </div>
    );
}


export function GalleryGenerator({folder = 'posters'}){
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadImages() {
            try {
                const imageModules = import.meta.glob('/src/assets/graphic_design/gallery/**/*.{jpg,JPG,png,PNG,gif,GIF,svg,SVG}');
                const imagePromises = Object.entries(imageModules).filter(([path]) => path.includes(`/${folder}/`)).map(([_, loader]) => loader());
                const loadedModules = await Promise.all(imagePromises);
                const loadedImages = loadedModules.map(module => module.default);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (err) {
                console.error("Failed to load images lol:", err);
                setError("Failed to load images");
                setIsLoading(false);
            }
        }

        loadImages();
    }, [folder]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="imageContainer">
            {images.map((src, index) => (
                <img
                    key={index}
                    src={src}
                    alt={`Gallery image ${index + 1}`}
                    style={{ width: 'fit-content', height: '230px', margin: '10px', objectFit: 'cover' }}
                />
            ))}
        </div>
    );
}