import Link from 'next/link';

const Invitespanel = () => {
    return (
        <div className='w-72 shadow-md rounded-md shadow-slate-300'>
            <header className='flex justify-between p-4 bg-slate-300 rounded-md'>
                <h2 className="text-xl">Invites</h2>
                <Link href="/sendinvites">
                    <i className="fa fa-plus cursor-pointer"></i>
                </Link>
            </header>
            <div className="p-4">

            </div>

        </div>
    )
}

export default Invitespanel