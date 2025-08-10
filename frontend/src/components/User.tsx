import { auth } from "../wrapper/authWrapper";

const User=()=> {
    const {userDetails} = auth();
  const user = {
    name: userDetails?.name,
    id: userDetails?._id,
  };

  const actions = [
    {
      title: "My Documents",
icon: (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776" />
  </svg>
),
      description: "View and manage your uploaded documents.",
      link: "/mydocs",
    },
    {
      title: "Upload Document",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m0-3-3-3m0 0-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" />
</svg>
),
      description: "Securely upload a new document.",
      link: "/upload",
    },
    {
      title: "Community Uploads",
      icon: (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-7">
  <path stroke-Linecap="round" stroke-Linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
</svg>
),
      description: "View documents others have shared with over internet.",
      link: "/",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 h-[85vh]">
      {/* Profile Card */}
      <div className="shadow-lg p-6 flex items-center gap-6">
        <div className=" p-4 rounded-full">
          <img src="user.png" className="size-20 rounded-2xl"/>
        </div>
        <div>
          <h2 className="text-2xl text-left font-semibold">{user.name}</h2>
          <p className="text-gray-500">User ID: {user.id}</p>
        </div>
      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {actions.map((action) => (
          <a
            key={action.title}
            href={action.link}
            className="shadow-md p-6 flex flex-col items-center text-center space-y-4 hover:shadow-lg transition"
          >
            <div className="text-gray-600">{action.icon}</div>
            <h3 className="text-lg font-semibold">{action.title}</h3>
            <p className="text-gray-500 text-sm">{action.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

export default User;