import Navbar from "@/components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faUserPlus } from "@fortawesome/free-solid-svg-icons";


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
                    <div className="w-full h-20 sensitiveDiv md:w-1/2 rounded-lg p-3 flex dark:bg-gray-600/10">
                        <div className="profilePhoto bg-gray-800/50 w-14 rounded-lg h-full">

                        </div>
                        <div className="flex flex-col ml-3 grow">
                            <h3 className=" dark:text-gray-200">Ashutosh Prajapati</h3>
                            <p className=" dark:text-gray-400">Pro Coder of the year award</p>
                        </div>
                        <button className="btn w-14 rounded-lg h-full ml-3">
                                <FontAwesomeIcon icon={faUserPlus} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    )
}