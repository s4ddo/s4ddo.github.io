import {Sections, useGlobalState} from "./GlobalState.jsx";
import React, {Suspense, useState, useEffect} from "react";


const SectionContent = {
    [Sections.GraphicDesign] : {
        Overview: () => <BasicOverview
                            title={"Graphic Design"}
                            subtitle={"Graphic Design and Animations"}
                            description={"A bunch of artistic projects I worked on over the years."}
                            domElement={<YouTubeEmbed video_id={"yqFCN44x69k"}/>}/>,

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
            subtitle={"Fancy Techy Projects"}
            description={`Programming projects that I have made throughout the years. Ranges from video games, websites 
            and even AI chatbots!`}
            domElement={<Picture folder={"code_projects/overview"} fileName={"0.JPG"}/>}/>,

        Kioku: () => <BasicOverview
            title={"Kioku"}
            subtitle={"Indie Rouge Lite Platformer Game"}
            sub_subtitle={"https://kiokugame.com"}
            description={`Kioku is a rhythmy souls-rouge like indie game (Yeah we know alot of words there...). Crafted 
            with inspiration and love drawn from video games we loved playing growing up. This is a passion project we 
            started on January 2024 to create a game tailored for gamers who enjoy skill based movement and rouge like 
            progression. While still trying to keep it as accessible to any player. Which is why were developing in 
            both pc and mobile in parallel.`}s
            domElement={<YouTubeEmbed video_id={"8VznNzeOSYw"}/>}/>,

        enVRnment: () => <BasicOverview
            title={"enVRnment"} 
            subtitle={"2nd Place Hackathon VR Environmental Game "}
            sub_subtitle={"https://github.com/s4ddo/vr_hackation"}
            description={`2nd place hackathon for IVM-VR lab environmental vr game project with the aim of raising 
            awareness of agricultural challenges using a vr simulation. The game was made in less than 24 hours from 
            planning, modeling, implementation and delivery.`}
            domElement={<video
                        controls
                        muted
                        autoPlay
                        style={{width: "95%"}}
                        src={`https://github.com/user-attachments/assets/01d5cb85-9253-45f6-b9c5-233c1abb05d0`}/>}/>,

        Erica: () => <BasicOverview
            title={"Erica & Ahmad"}
            subtitle={"One Year Anniversary Video Game"}
            sub_subtitle={"https://www.instagram.com/p/C4TV4opsZpo"}
            description={`A video game I made for my one year anniversary with my top no 1 g Erica sigma. This game is 
             set to private because its really special for me!`}
            domElement={<Picture folder={"code_projects/erica"} fileName={"0.jpg"}/>}/>,


        LaunchZone: () => <BasicOverview
            title={"Launch Zone"}
            subtitle={"UX Design Project"}
            sub_subtitle={"https://s4ddo.github.io"}
            description={`A UX design project I developed for a course during my university's first year of study. 
            The goal was to create an efficient implementation of a social media platform that would help people find 
            and connect with startups '`}
            domElement={<PictureGallery folder={"code_projects/launch_zone"}/>}/>,

        CeilBeit: () => <BasicOverview
            title={"CeilBeit"}
            subtitle={"UX Design Freelance Project for Celibeit"}
            description={`A UX design project I developed for a startup company called Ceilbeit. The startup aimed to 
            create portfolios for people who want a quick and easy way to have a website and social media presence.'`}
            domElement={<PictureGallery folder={"code_projects/ceilbeit"}/>}/>,
    },
    [Sections.General] : {
        Overview: () => <BasicOverview
            title={[Sections.General]}
            subtitle={"Graphic Design and Animations"}
            description={"A bunch of artistic projects I worked on over the years."}
            domElement={() => <p style={{color: "white"}}> Sigma Boy </p>}/>,
    }

}

function Picture({ folder, fileName }) {
    const [image, setImage] = useState(null);
    useEffect(() => {
        async function loadImage() {
            const imageModule = await import(`/portfolio/src/assets/${folder}/${fileName}`);
            setImage(imageModule.default);
        }
        loadImage();
    }, [folder, fileName]);

    return <img src={image} style={{width: "100%"}} alt="Loaded content" />;
}


function PictureGallery({ folder }) {
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
function ButtonToolbar({currentSection}) {
    const cubes = [];

    cubes.push(<BackButton text={"Back"}/>);
    Object.keys(SectionContent[currentSection]).forEach((key) => {
        cubes.push(<SubSectionButton key={key} text={key}/>)
    })


    return <div>{cubes}</div>;
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
function YouTubeEmbed({video_id = `yqFCN44x69k`}){

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <iframe
                width="560"
                height="315"
                src={`https://www.youtube.com/embed/${video_id}?si=QJPHEDjkAV8Na_oD`}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen />
        </Suspense>)
        ;
}
function BasicOverview({title, subtitle, sub_subtitle, description, domElement = () => <></>}){
    return (
        <div style={{display: "block", height: "100%" , overflow: "scroll"}}>
            <h1>{title}</h1>
            <h3>{subtitle}</h3>
            <a href={sub_subtitle}>{sub_subtitle}</a>
            <p>{description}</p>
            {domElement}
        </div>
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
