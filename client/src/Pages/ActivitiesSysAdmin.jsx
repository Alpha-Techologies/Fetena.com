import { Table } from "antd"
import { getAllActivities } from "../Redux/features/dataActions"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useEffect, useState } from "react"

const ActivitiesSysAdmin = () => {
    const dispatch = useDispatch()
    const [activitesList, setActivitesList] = useState([])

    const fetchAllActivites = () => {
        dispatch(getAllActivities())
            .then((res) => {
            console.log(res)
            if (res.meta.requestStatus === "fulfilled") {
                const tempData = res.data.data.data
                setActivitesList(tempData)
            } else {
                toast.error(res.message)
            }
        })
        .catch((error) => {
            console.log(error);
            toast.error("There is some error in the server!");
        });
        
    }

    useEffect(() => {
        fetchAllActivites()
    }, [])

  return (
    <div className='flex flex-col gap-4 items-start'>
      <h1 className='text-2xl font-bold text-blue-900 text-left'>
        Users List
          </h1>
          <Table />
        </div>
  )
}
export default ActivitiesSysAdmin