import {auth, signOut} from "@/auth";
import {Button} from "@/components/ui/button";

const Home = async () => {
    const session = await auth();
    console.log(session);
    return (
        <div>
            <h1 className="h1-bold underline">Hello</h1>

        </div>
    )
        ;
}
export default Home;