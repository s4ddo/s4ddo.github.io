import { Sections, useGlobalState } from "./GlobalState.jsx";
import React, { Suspense } from "react";

export function ButtonToolbar({ SectionContent, currentSection }) {
  const cubes = [];

  cubes.push(<BackButton text={"Back"} />);
  Object.keys(SectionContent[currentSection]).forEach((key) => {
    cubes.push(<SubSectionButton key={key} text={key} />);
  });

  return <div>{cubes}</div>;
}
export function BackButton({ text }) {
  const { setCurrentSection, currentTarget, setCurrentTarget } =
    useGlobalState();

  const onClick = () => {
    setCurrentSection(Sections.Intro);
    setCurrentTarget({ x: 0, y: 0, z: 0 });
  };

  return (
    <div
      className={`button fadein ${currentTarget.x < 0 ? "" : "right"} `}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export function SubSectionButton({ text }) {
  const { currentTarget, currentSubSection, setCurrentSubSection } =
    useGlobalState();

  const onClick = () => setCurrentSubSection(text);
  return (
    <div
      className={`button 
              fadein 
              ${currentTarget.x < 0 ? "" : "right"} 
              ${currentSubSection === text ? "active" : ""}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
}

export function YouTubeEmbed({ video_id = `yqFCN44x69k` }) {
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
        allowfullscreen
      />
    </Suspense>
  );
}
export function BasicOverview({
  title,
  subtitle,
  sub_subtitle,
  description,
  domElement = () => <></>,
}) {
  return (
    <div class="overview" >
      <h1>{title}</h1>
      <h3>{subtitle}</h3>
      <a href={sub_subtitle}>{sub_subtitle}</a>
      <p>{description}</p>
      {domElement}
    </div>
  );
}
