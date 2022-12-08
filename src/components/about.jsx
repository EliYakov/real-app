import PageHeader from "./common/pageheader";

const About = () => {
  return (
    <PageHeader
      title={
        <>
          About Real <i className="bi bi-geo-fill"></i>App
        </>
      }
      description={
        <>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At laborum,
          eius odit nostrum repudiandae ducimus aliquid deleniti, atque omnis
          magnam impedit doloribus voluptatibus optio qui laboriosam quo modi,
          corrupti nam?
        </>
      }
    />
  );
};

export default About;
