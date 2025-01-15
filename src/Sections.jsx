import {Sections, useGlobalState} from "./GlobalState.jsx";
import {Picture, PictureGallery, GalleryGenerator} from "./Pictures.jsx";
import {ButtonToolbar, YouTubeEmbed, BasicOverview} from "./SectionsContent.jsx";

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
            sub_subtitle={"https://s4ddo.itch.io/erica-ahmad-episode-2"}
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

        PygameWordle: () => <BasicOverview
            title={"Pygame Wordle"}
            subtitle={"A Pygame Wordle Project"}
            sub_subtitle={"https://s4ddo.itch.io/python-wordle-game"}
            description={`This was a game I woked on to familiarize myself with Python before enterhing university. It 
            was really fun to make!'`}
            domElement={<PictureGallery folder={"code_projects/wordle"}/>}/>,
    },
    [Sections.General] : {
        Overview: () => <BasicOverview
            title={[Sections.General]}
            subtitle={"Graphic Design and Animations"}
            description={"A bunch of artistic projects I worked on over the years."}
            domElement={() => <p style={{color: "white"}}> Sigma Boy </p>}/>,
    }

}

export function PopUp({title = 'Title', subtitle = 'Subtitle', description = 'description'}){
    const {currentTarget, currentSection, currentSubSection} = useGlobalState();

    return (
    <div className={`popup ${currentTarget.x < 0 ? "right fadeinleft" : "fadeinright"}`}>
        <ButtonToolbar SectionContent={SectionContent} currentSection={currentSection}/>
        {SectionContent[currentSection][currentSubSection]()}
    </div>);
}
