import { useEffect,useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {ClipLoader} from "react-spinners";

import CheckInCards from "../components/checkin/CheckInCards";
import CheckInForm from "../components/checkin/CheckInForm";
import CheckInTable from "../components/checkin/CheckInTable";

import api from "../services/api";



export default function CheckIns(){


const [checkins,setCheckins]=useState([]);

const [students,setStudents]=useState([]);

const [loading,setLoading]=useState(true);

const [search,setSearch]=useState("");

const [showForm,setShowForm]=useState(false);

const [editCheckIn,setEditCheckIn]=useState(null);



const loadCheckins=async()=>{


try{

setLoading(true);

const res=await api.get("/checkins/");

setCheckins(res.data);


}

catch(err){

console.error(err);

}

finally{

setLoading(false);

}


};




const loadStudents=async()=>{


try{

const res=await api.get("/students/");

setStudents(res.data);


}

catch(err){

console.error(err);

}


};




useEffect(()=>{

loadCheckins();
loadStudents();

},[]);




if(loading){

return(

<DashboardLayout>

<div className="
flex
justify-center
items-center
h-[80vh]
">

<ClipLoader
color="#38bdf8"
size={60}
/>

</div>


</DashboardLayout>

);

}




const filtered=checkins.filter(item=>{


const student=students.find(
s=>s.id===item.student_id
);


return (

student?.name
?.toLowerCase()
.includes(search.toLowerCase())

||

item.mood
?.toLowerCase()
.includes(search.toLowerCase())

);


});





return(

<DashboardLayout>


<div className="
flex
justify-between
items-center
mb-8
">


<div>

<h1 className="
text-4xl
font-bold
text-white
">

Daily Check-ins

</h1>


<p className="
text-white/70
mt-2
">

Monitor student mood and wellbeing

</p>


</div>



<button

onClick={()=>{

setEditCheckIn(null);
setShowForm(true);

}}

className="
bg-cyan-500
hover:bg-cyan-600
text-white
px-6
py-3
rounded-2xl
shadow-xl
"

>

+ New Check-in

</button>


</div>




<CheckInCards

total={checkins.length}

/>

<div className="mb-8 flex justify-center">

    <div
        className="
            relative
            w-full
            max-w-3xl
            rounded-3xl
            border border-white/20
            bg-white/10
            backdrop-blur-2xl
            shadow-2xl
            overflow-hidden
        "
    >

        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10"></div>

        <div className="relative flex items-center px-6 py-4">

            <span className="text-2xl mr-4">🔍</span>

            <input

placeholder="Search student..."

value={search}

onChange={(e)=>setSearch(e.target.value)}

className="
w-full
bg-transparent
outline-none
text-white
placeholder:text-white/50
"

/>
        </div>

    </div>

</div>


<CheckInTable

checkins={filtered}

students={students}

refresh={loadCheckins}

onEdit={(row)=>{

setEditCheckIn(row);
setShowForm(true);

}}

/>









{showForm &&

<div className="
fixed
inset-0
bg-black/60
backdrop-blur-sm
flex
justify-center
items-center
z-50
">


<div
    className="
        relative
        bg-slate-900/80
        border
        border-white/20
        rounded-3xl
        p-8
        w-full
        max-w-3xl
    "
>
    {/* Close Button */}
    <button
    onClick={() => setShowForm(false)}
    className="
        absolute
        top-4
        right-4
        w-10
        h-10
        rounded-full
        bg-white/10
        hover:bg-red-500/30
        flex
        items-center
        justify-center
        text-2xl
        text-white
        transition
    "
>
    &times;
</button>

    <CheckInForm
        checkin={editCheckIn}
        onCheckInAdded={() => {
            loadCheckins();
            setShowForm(false);
        }}
    />
</div>


</div>


}



</DashboardLayout>

);


}