const twcss =  'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original-wordmark.svg'
const reactjs = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"


function Images({title, classes}) {
    console.log(title);

    const image = {
        tailwind: twcss,
        react: reactjs
    }
    
    return (<>
        <img 
        src={image[title]} 
        alt={title}
        className={classes}>            
        </img>
    </>)
}
export default Images