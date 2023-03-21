import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function Search() {
    return (
        <>
            <Navbar />
            <section className="mt-5">
                <form className="w-full px-4 flex justify-center">
                    <input className="form-input w-full md:w-1/2 border-r-0  input rounded-lg rounded-tr-none rounded-br-none" placeholder="Search" type="text" name="query" id="" />
                    <button type="submit" className="btn px-3 rounded-tr-lg dark:border-0 rounded-br-lg border-[1px] border-l-0 border-gray-500"><FontAwesomeIcon icon={faMagnifyingGlass} /></button>
                </form>

                <div id="searchResults" className="flex flex-col gap-y-8 items-center w-full px-4 mt-5">
                    <div className="w-full h-24 sensitiveDiv md:w-1/2 rounded-lg p-3 flex">
                        <div className="profilePhoto bg-gray-900 w-20 rounded-lg h-full">

                        </div>
                        <div className="flex flex-col ml-3 grow">
                            <h3 className=" dark:text-gray-200">Ashutosh Prajapati</h3>
                            <p className=" dark:text-gray-400">Pro Coder of the year award</p>
                            <hr className="dark:opacity-30 mt-1" />
                            <p className="dark:text-gray-400 text-sm">Some other Lorem Ispum</p>
                        </div>
                        <button className="bg-gray-900 w-20 rounded-lg h-full ml-3">
                                Add Friend
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}