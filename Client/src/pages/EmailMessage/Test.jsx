// // Saarthak

// import React, { useState } from 'react'
// import Navbar from '../../components/Navbar/Navbar'
// import SearchBar from '../../components/Searchbar/Searchbar'

// const EmailMessage = () => {
//     const handleSearch = (searchTerm) => {
//         // Handle search functionality here
//         console.log('Searching for:', searchTerm);
//     };

//     const [name, setName] = useState('');
//     const [phone, setPhone] = useState('');
//     const [list, setList] = useState([]);

//     const handleAddToList = () => {
//         if (name.trim() === '' || phone.trim() === '') {
//             alert('Please fill out both fields.');
//             return;
//         }
//         setList([...list, { name, phone }]);
//         setName('');
//         setPhone('');
//     };

//     const [selectedFiles, setSelectedFiles] = useState([]);

//     const handleFileChange = (event) => {
//         setSelectedFiles([...event.target.files]);
//     };

//     const handleUpload = () => {
//         if (selectedFiles.length === 0) {
//             alert("Please select a file to upload.");
//             return;
//         }

//         // Add logic to upload files to the server or process them
//         console.log("Files ready to upload:", selectedFiles);
//     };

//     return (
//         <div className="flex min-h-screen bg-gray-50">
//             <Navbar />
//             <main className="flex-1 ml-16 p-8">
//                 <div className="max-w-7xl mx-auto">
//                     <div className="flex mb-8">
//                         <h1 className="text-2xl font-semibold text-gray-900 mr-4 mt-1">Email Messages</h1>
//                         <SearchBar onSearch={handleSearch} />
//                     </div>
//                     <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-medium mb-4">Subject:
//                                 <div>
//                                     <input
//                                         type="text"
//                                         placeholder="Subject..."
//                                         className="min-w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-zinc-950 mt-4"
//                                         style={{ borderColor: '#94AEFF' }}
//                                     />
//                                 </div>
//                             </h2>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-medium mb-4">Subject:
//                                 <div>
//                                     <input
//                                         type="text"
//                                         placeholder="Subject..."
//                                         className="min-w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-zinc-950 mt-4"
//                                         style={{ borderColor: '#94AEFF' }}
//                                     />
//                                 </div>
//                             </h2>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-sm text-lg font-medium mb-4">
//                             User Credentials:
//                             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
//                                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                                     <h2 className="text-md font-medium mb-4">Name:
//                                         <div>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Subject..."
//                                                 value={name}
//                                                 onChange={(e) => setName(e.target.value)}
//                                                 className="min-w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-zinc-950 mt-4"
//                                                 style={{ borderColor: '#94AEFF' }}
//                                             />
//                                         </div>
//                                     </h2>
//                                 </div>
//                                 <div className="bg-white p-6 rounded-lg shadow-sm">
//                                     <h2 className="text-md font-medium mb-4">Phone Number:
//                                         <div>
//                                             <input
//                                                 type="text"
//                                                 placeholder="Subject..."
//                                                 value={phone}
//                                                 onChange={(e) => setPhone(e.target.value)}
//                                                 className="min-w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-zinc-950 mt-4"
//                                                 style={{ borderColor: '#94AEFF' }}
//                                             />
//                                         </div>
//                                     </h2>
//                                 </div>
//                             </div>
//                             <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 mb-8">
//                                 <div className='flex justify-center'>
//                                     <button className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500" onClick={handleAddToList}>Add</button>
//                                 </div>
//                             </div>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-medium mb-4">List:
//                                 <div className="border-black">
//                                     <ul>
//                                         {list.map((item, index) => (
//                                             <li key={index}>
//                                                 {item.name} - {item.phone}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             </h2>
//                         </div>
//                         <div className="bg-white p-6 rounded-lg shadow-sm">
//                             <h2 className="text-lg font-medium mb-4">Upload Attachments:</h2>
//                             <input
//                                 type="file"
//                                 multiple
//                                 onChange={handleFileChange}
//                                 className="min-w-full px-4 py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-zinc-950 mt-4"
//                             />
//                             <div className="mb-4">
//                                 {selectedFiles.length > 0 && (
//                                     <ul>
//                                         {selectedFiles.map((file, index) => (
//                                             <li key={index} className="text-gray-600">
//                                                 {file.name}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 )}
//                             </div>
//                             <div className='flex justify-center'>
//                             <button
//                                 onClick={handleUpload}
//                                 className="inline-block rounded bg-indigo-600 px-6 py-2 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
//                             >
//                                 Upload
//                             </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </main>
//         </div>
//     )
// }

// export default EmailMessage