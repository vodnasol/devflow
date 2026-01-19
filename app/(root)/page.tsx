import Hello from "@/components/hello";

const Home =() =>{
    console.log("Home page");
    return (
        <main>
            <div className="text-5xl underline">Welcome to NextJS</div>
            <Hello />
        </main>

    )

}
export default Home;


