import {useEffect} from 'react';
import Friends from '../../components/Messages/Friends';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/router';
import Chats from '../../components/Messages/Chats';

const ChatMessages = () => {
    const router = useRouter();
    const {friendId} = router.query;

    useEffect(() => {
      console.log(friendId)
    
    }, [])
    
    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <section id="messages" className='flex gap-x-3 flex-grow'>
                <div className='w-96 p-3 shadow-lg h-full'>
                    <Friends />
                </div>
                <Chats friendId={friendId}/>
            </section>
        </div>
    )
}

export default ChatMessages;