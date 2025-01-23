import {Sections, useGlobalState} from "./GlobalState.jsx";
import {Picture, PictureGallery, GalleryGenerator, NewGalleryGen} from "./Pictures.jsx";
import {ButtonToolbar, YouTubeEmbed, BasicOverview} from "./SectionsContent.jsx";

import React, {Suspense, useState, useEffect} from "react";

const SectionContent = {
    [Sections.GraphicDesign] : {
        Overview: () => <BasicOverview
                            title={"Graphic Design"}
                            subtitle={"Posters, Illustrations, Logos and etc."}
                            description={`Back in highschool I did a loooooot of work for my student council as a graphic designer.
                            it was really fun and I got weirdly good at it. I've made posters, arts and even whole ass
                            books for my yearbook. I probably have around 2000 hours alone in photoshop. Ironically I 
                            still suck at it`}
                            domElement={<Picture folder={"graphic_design"} fileName={"overview.gif"}/>}/>,

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
            description={`Programming projects that I have made throughout the years. Ranges from websites 
            and even AI chatbots! Most of my work is front-end and a little bit of back end but its very unnoticable`}
            domElement={<Picture folder={"code_projects/overview"} fileName={"0.JPG"}/>}/>,

        "ROS Robot": () => <BasicOverview
            title={"ROS Robot"}
            subtitle={"Robot Manipulation in ROS"}
            technologies={"ROS | PYTHON | WSL | GIT"}
            description={`Probably one of the buggiest projects I've ever done. However, it opened me to the gate of
            Linux and how sigma it is.`}
            domElement={<PictureGallery folder={"code_projects/robot"}/>}/>,



        "AI Flocking Agents": () => <BasicOverview
            title={"AI Flocking Agents"}
            subtitle={"AI Simulations of Predators and Prey"}
            sub_subtitle={"https://shorturl.at/Vn4hO"}
            technologies={"PYTHON | VIOLET | PYGAME | GIT"}
            description={`A project aimed to simulate how flocking works in an  environment of a Predators and Prey. The
            aim was to create a simulation tuned to provide equilibrium. Where when the predators eat too much prey predators
            die out and when predators are less prey increase and a loop commences. The triangles represent Predators and 
            the circles represent Prey.`}
            domElement={<Picture width={"50%"} folder={"code_projects/agent_ai"} fileName={"agent_ai.gif"}/>}/>,

        "AI RL Maze": () => <BasicOverview
            title={"Reinforcement Learning Maze"}
            subtitle={"Agent Learning Maze"}
            sub_subtitle={"https://shorturl.at/1w4iS"}
            technologies={"PYTHON | NUMPY | GYM | PYGAME | GIT"}
            description={`A very simple RL Agent that tries to find the shortest path in a maze using Q Learning.`}
            domElement={<Picture width={"50%"} folder={"code_projects/rl"} fileName={"rl.gif"}/>}/>,


        "AI Cat Chef": () => <BasicOverview
            title={"AI Cat Chef"}
            subtitle={"Cat Chef Themed AI Chatbot"}
            technologies={"PROLOG | MARBEL |  DIALOGFLOW | HTML | CSS | GIT "}
            description={`An AI chatbot that is themed as a cat and gives you cooking ingredients/intructions. This was 
             developed alongside my  awesome classmates. Really funy to work on! Unfortunately, it used a reesearch 
             language called MARBEL so its really hard to run. Only some screenshots are available :( .`}
            domElement={<PictureGallery folder={"code_projects/ai_chatbot"}/>}/>,

        "kiokugame.com": () => <BasicOverview
            title={"Kiokugame.com"}
            subtitle={"Website for Kioku."}
            technologies={"HTML | CSS | JS | BLENDER | GIT"}
            sub_subtitle={"https://kiokugame.com"}
            description={`I thought this would be a good thing to be seperate from the Kioku game itself. As working on 
            this felt like its own project!`}
            domElement={<Picture folder={"code_projects/kiokugamecom"} fileName={"kiokugamecom.gif"}/>}/>,

        SpotifyV2: () => <BasicOverview
            title={"SpotifyV2"}
            subtitle={"Mini Spotify Recommender"}
            technologies={"PYTHON | CSV | TKINTER"}
            description={`A small python app that I made based on a dataset that had songs and also its genre and frequencies.
            Each week the user gets is given 5 random songs. Based on those random songs they recommend what more songs to 
            recommend.`}
            domElement={<Picture width={"50%"} folder={"code_projects/spotifyv2"} fileName={"spotify.gif"}/>}/>,

        LaunchZone: () => <BasicOverview
            title={"Launch Zone"}
            subtitle={"UX Design Project"}
            sub_subtitle={"https://s4ddo.github.io"}
            technologies={"HTML | CSS | JS | GIT"}
            description={`A UX design project I developed for a course during my university's first year of study. 
            The goal was to create an efficient implementation of a social media platform that would help people find 
            and connect with startups '`}
            domElement={<PictureGallery folder={"code_projects/launch_zone"}/>}/>,

        CeilBeit: () => <BasicOverview
            title={"CeilBeit"}
            subtitle={"UX Design Freelance Project for Celibeit"}
            technologies={"HTML | CSS | JS | GIT"}
            description={`A UX design project I developed for a startup company called Ceilbeit. The startup aimed to 
            create portfolios for people who want a quick and easy way to have a website and social media presence.'`}
            domElement={<PictureGallery folder={"code_projects/ceilbeit"}/>}/>,

    },

    [Sections.Animations] : {
        Overview: () => <BasicOverview
            title={[Sections.Animations]}
            subtitle={"Sigma Animations"}
            description={`Being an animator has always been like the dream job. Nowadays I make animations as a hobby 
            for gifts or just for fun in general. Its really theraputic although it can be really tedious at some times. Ive left out
            alot of the animations I made as most of them are very sketchy and unfinished. If you want to see all of them
            hop on @s4ddo on Instagram!`}
            domElement={<Picture folder={"animations"} fileName={"overview.jpg"}/>}/>,
        "The Pearl": () => <BasicOverview
            title={"The Pearl"}
            subtitle={"Cancelled Short Animation For a Museum"}
            description={`One of my most favorite and recent animations that I made. I was comissioned by a student interning
            at a museum to make an animation for them. However, it fell through but I ended up making it anyways for fun!`}
            domElement={<YouTubeEmbed video_id={"yqFCN44x69k"}/>}/>,
        "Valentina": () => <BasicOverview
            title={"Valentina"}
            subtitle={"Quick Animation for The Queen"}
            description={`Small present I made for the Queen, very fun to work on and first time I tried a non tidy coloring 
            style.`}
            domElement={<YouTubeEmbed video_id={"aTfgbwh7eEo"}/>}/>,
        "C-Fex": () => <BasicOverview
            title={"C-Fex"}
            subtitle={"Analog Horror Short Animation"}
            description={`An analog horror project I started at 9th grade ish when I was so inspirted by the growing analog
            horror scene in the internet. I really wanted to make my own ARG lol`}
            domElement={<YouTubeEmbed video_id={"vBuomPbGKXw"}/>}/>,
        "Bike Girl": () => <BasicOverview
            title={"Bike Girl"}
            subtitle={"A Girl Biking Short Anim"}
            description={`Very old animation wanted to play with compositing.`}
            domElement={<YouTubeEmbed video_id={"P7M5wOvDIzI"}/>}/>,
        "Sleepy Dude": () => <BasicOverview
            title={"Sleepy Dude"}
            subtitle={"a sleep guy?"}
            description={`Not much to say about it lol`}
            domElement={<YouTubeEmbed video_id={"9SiwRSoHxUo"}/>}/>,

    },
    [Sections.Games] : {
        Overview: () => <BasicOverview
            title={[Sections.Games]}
            subtitle={"Video Games Developed Over The Years"}
            description={`Since a kid I've always been passionate about video games. Its reached the point where now I've
              had the privilege of making some for myself! Some of these suck but I'm proud nonetheless :) . `}
            domElement={<Picture folder={"games"} fileName={"overview.gif"}/>}/>,
        Kioku: () => <BasicOverview
            title={"Kioku"}
            subtitle={"Indie Rouge Lite Platformer Game"}
            sub_subtitle={"https://kiokugame.com"}
            technologies={"C# | UNITY | FIREBASE | BLENDER | PS | STEAMWORKS SDK | GIT "}

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
            technologies={"C# | UNITY | BLENDER "}
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
            technologies={"C# | UNITY | BLENDER "}

            description={`A video game I made for my one year anniversary with my top no 1 g Erica sigma. This game is 
             set to private because its really special for me!`}
            domElement={<PictureGallery folder={"games/erica"}/>}/>,
        PygameWordle: () => <BasicOverview
            title={"Pygame Wordle"}
            subtitle={"A Pygame Wordle Project"}
            technologies={"PYTHON | PYGAME"}

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
