import {Sections, useGlobalState} from "./GlobalState.jsx";
import React, {Suspense, useState, useEffect} from "react";


const SectionContent = {
    [Sections.GraphicDesign] : {
        Overview: () => <BasicOverview
                            title={"Graphic Design"}
                            subtitle={"Graphic Design and Animations"}
                            description={"A bunch of artistic projects I worked on over the years."}
                            domElement={YouTubeEmbed}/>,
        Posters: () => <GalleryGenerator folder={'posters'}/>,
        "Landscape Posters": () => <GalleryGenerator folder={'posters_landscape'}/>,
        Books: () => <GalleryGenerator folder={'books'}/>,
        Creative: () => <GalleryGenerator folder={'creative'}/>,
        Instagram: () => <GalleryGenerator folder={'instagram'}/>,
        Logos: () => <GalleryGenerator folder={'logos'}/>
    },
    [Sections.Programming] : {
        Overview: () => <BasicOverview
            title={[Sections.Programming]}
            subtitle={"Graphic Design and Animations"}
            description={"A bunch of artistic projects I worked on over the years."}
            domElement={() => <p style={{color: "white"}}> Sigma Boy </p>}/>,
    },
    [Sections.General] : {
        Overview: () => <BasicOverview
            title={[Sections.General]}
            subtitle={"Graphic Design and Animations"}
            description={"A bunch of artistic projects I worked on over the years."}
            domElement={() => <p style={{color: "white"}}> Sigma Boy </p>}/>,
    }

}



function GalleryGenerator({folder = 'posters'}){
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
                console.error("Failed to load images:", err);
                setError("Failed to load images");
                setIsLoading(false);
            }
        }

        loadImages();
    }, [folder]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "left", height: "60vh", overflow:"scroll"}}>
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
function ButtonToolbar({currentSection}) {
    const {currentTarget} = useGlobalState();
    const cubes = [];

    if (currentTarget.x > 0 ) cubes.push(<BackButton text={"Back"}/>);
    Object.keys(SectionContent[currentSection]).forEach((key) => {
        cubes.push(<SubSectionButton key={key} text={key}/>)
    })
    if (currentTarget.x < 0 ) cubes.push(<BackButton text={"Back"}/>);


    return cubes;
}
function BackButton({text}) {
    const { setCurrentSection, currentTarget, setCurrentTarget } = useGlobalState();

    const onClick = () => {
        setCurrentSection(Sections.Intro);
        setCurrentTarget({x:0, y: 0, z: 5 });
    }

    return <div className={`button fadein ${currentTarget.x < 0 ? "" : "right"} `} onClick={onClick}>{text}</div>
}

export function SubSectionButton({text}) {
    const {currentTarget, currentSubSection ,setCurrentSubSection} = useGlobalState();

    const onClick = () => setCurrentSubSection(text);
    return <div
        className=
            {`button 
              fadein 
              ${currentTarget.x < 0 ? "" : "right"} 
              ${currentSubSection === text ? "active" : ""}`} onClick={onClick}>{text}</div>
}
export function Intro(){

    return (
        <div className='titleBox'>
            <h1 className="fadein title">s4ddo's</h1>
            <h3 className="fadein title">portfolio</h3>
        </div>
    );
}
function YouTubeEmbed(){

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/yqFCN44x69k?si=QJPHEDjkAV8Na_oD"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen />
        </Suspense>)
        ;
}
function BasicOverview({title, subtitle, description, domElement}){
    return (
        <>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <p>{description}</p>
            {domElement()}
        </>
    );
}


export function PopUp({title = 'Title', subtitle = 'Subtitle', description = 'description'}){
    const {currentTarget, currentSection, currentSubSection} = useGlobalState();

    return (
    <div className={`popup ${currentTarget.x < 0 ? "right fadeinleft" : "fadeinright"}`}>
        <ButtonToolbar currentSection={currentSection}/>
        {SectionContent[currentSection][currentSubSection]()}
    </div>);
}
