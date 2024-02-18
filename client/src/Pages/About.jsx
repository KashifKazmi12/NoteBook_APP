import BannerImage from "../img/banner-image.png"

const About = () => {
  return (
    <div>
    <main>
        
        <section>
            <div  className="banner bg-purple-800 text-white flex justify-between items-center px-36">
                <div className="content">
                    <h1 className="h1 text-3xl font-condensed font-bold leading-snug">Your Digital Notebook for Infinite Ideas!</h1>
                    <hr className="hr my-5 w-24"/>
                    <p className="para font-serif text-">Welcome to the Personal Notebook App, your trusted companion for effortless note-taking and organization. Our mission is to provide you with a user-friendly and secure platform to capture, store, and manage your thoughts, ideas, and important information.</p>
                    <div className="button mt-6 flex gap-4">
                        <button className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-50% to-emerald-500 to-70% rounded-xl hover:bg-gradient-to-l hover:from-indigo-500 hover:from-10% hover:via-sky-500 hover:via-50% hover:to-emerald-500 hover:to-70% border-2 hover:borer-black text-white py-2 px-3 font-semibold">Buy Now</button>
                        <button className="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-50% to-emerald-500 to-70% rounded-xl hover:bg-gradient-to-l hover:from-indigo-500 hover:from-10% hover:via-sky-500 hover:via-50% hover:to-emerald-500 hover:to-70% border-2 hover:borer-black text-white py-2 px-5 font-semibold">Contact Us</button>
                    </div>
                </div>
                <div className="image" style={{height:"460px"}}><img src={BannerImage} alt="" className="h-full w-auto"/></div>
            </div>
            <div style={{position: "relative", top: "-1px"}} className="clip-path">
                <svg className="rotate text-purple-800" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path className="opacity-20 translate-top-2" fill="currentColor" fillOpacity="1"
                        d="M0,160L60,186.7C120,213,240,267,360,245.3C480,224,600,128,720,106.7C840,85,960,139,1080,149.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                    </path>
                    <path className="opacity-30 translate-top-1" fill="currentColor" fillOpacity="1"
                        d="M0,160L60,186.7C120,213,240,267,360,245.3C480,224,600,128,720,106.7C840,85,960,139,1080,149.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                    </path>
                    <path fill="currentColor" fillOpacity="1"
                        d="M0,160L60,186.7C120,213,240,267,360,245.3C480,224,600,128,720,106.7C840,85,960,139,1080,149.3C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z">
                    </path>
                </svg>
            </div>
        </section>
    </main>
    </div>
  )
}

export default About
