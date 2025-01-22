import React, {useEffect, useState} from "react";

export function Picture({ folder, fileName }) {
    const image = `./${folder}/${fileName}`

    return <img src={image} style={{width: "100%"}} alt="Loaded content" />;
}

export function NewGalleryGen({folder}){

}
export function PictureGallery({ folder }) {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentImage, setCurrentImage] = useState(-1);


    useEffect(() => {
        async function loadImages() {
            setIsLoading(true);
            const imageModules = import.meta.glob('/src/assets/**/*.{jpg,JPG,png,PNG,gif,GIF,svg,SVG}');
            const imagePromises = Object.entries(imageModules).filter(([path]) => path.includes(`/${folder}/`)).map(([_, loader]) => loader());
            const loadedModules = await Promise.all(imagePromises);
            const loadedImages = loadedModules.map(module => module.default);
            setImages(loadedImages);
            setIsLoading(false);
        }
        loadImages();
    }, [folder]);

    return (
        <>
            <div className="imageContainer">
                {isLoading && <div>Loading...</div>  }
                {!isLoading && images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="my_image"
                        onClick={() => setCurrentImage(index)}

                    />
                ))}
            </div>

            {currentImage != -1 &&
                <ImagePopup
                    close = {() => setCurrentImage(-1)}
                    back = {() => {
                        if (currentImage - 1 > -1)
                            setCurrentImage(currentImage - 1)
                    }}
                    forward = {() => {
                        if (currentImage + 1 < images.length)
                            setCurrentImage(currentImage + 1)
                    }}
                    src = {images[currentImage]}

                />
            }
        </>
    );
}


export function GalleryGenerator({folder = 'posters'}){
    const [images, setImages] = useState([]);
    const [currentImage, setCurrentImage] = useState(-1);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function loadImages() {
            setIsLoading(true);
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

    return (
        <>
            <div className="imageContainer">
                {isLoading && <div>Loading...</div>}
                {!isLoading && images.map((src, index) => (
                    <img
                        key={index}
                        src={src}
                        alt={`Gallery image ${index + 1}`}
                        className="my_image"
                        onClick={() => setCurrentImage(index)}
                    />
                ))}


            </div>
            {currentImage != -1 &&
                <ImagePopup
                    close = {() => setCurrentImage(-1)}
                    back = {() => {
                        if (currentImage - 1 > -1)
                            setCurrentImage(currentImage - 1)
                    }}
                    forward = {() => {
                        if (currentImage + 1 < images.length)
                            setCurrentImage(currentImage + 1)
                    }}
                    src = {images[currentImage]}

                />

            }
        </>

);
}

function ImagePopup({close ,back ,forward ,src }){
    return (
        <div className="big_image">
            <div
                className={`button custom`}
                onClick={close}
            >
                X
            </div>

            <div>
                <div
                    className={`button custom centered`}
                    onClick={back}
                >
                    {"<"}
                </div>
                <div
                    style={{right: "0", left: "unset"}}
                    className={`button custom centered`}
                    onClick={forward}
                >
                    {">"}
                </div>
            </div>
            <Image src = {src}/>
        </div>

    )
}

function Image({src}){

    return (
        <img src={src} alt="Image"  style={{height: "100%",
            width: "100%",
            objectFit: "contain",}} />
    )
}