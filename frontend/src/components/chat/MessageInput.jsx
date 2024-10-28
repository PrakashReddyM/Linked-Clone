// import axios from 'axios';
// import React, { useState } from 'react';
// import { BaseUrl } from '../../utils/api';
// import useConversation from '../../zustand/useConversation';

// const MessageInput = () => {
//   const [msgInput, setMsgInput] = useState('');
//   const { selectedConversation } = useConversation()

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     try {
//       if (msgInput) {
//         await axios.post(`${BaseUrl}/message/${selectedConversation._id}/send`, { message: msgInput }, { withCredentials: true })
//         setMsgInput('')
//       }
//     } catch (error) {
//       console.log(error)
//     }
//   }

//   return (
//     <div className='w-full fixed bottom-0'>
//       <form onSubmit={handleSubmit} className='w-full'>
//         <div className="flex items-center bg-gray-100 px-4 py-2 rounded-lg shadow-lg">
//           <input
//             type="text"
//             value={msgInput}
//             onChange={(e) => setMsgInput(e.target.value)}
//             placeholder="Type a message..."
//             className="flex-1 px-2 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg focus:outline-none"
//           />
//           <button type='submit' className="ml-4 bg-blue-600 hover:bg-blue-600 text-white px-4 py-1 rounded-md transition-all">Send</button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default MessageInput;
