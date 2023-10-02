import axios from 'axios'

const BASE_URL='https://todo-list.alphacamp.io/api'

const axiosInstance = axios.create({ baseURL: BASE_URL})
//利用interceptor在request之前做添加headers
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token){
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config //要將設定回傳才會生效
  },
  (error) => {
    console.error(error)
  }
)

export const getTodo = async () => {
  try{
    const res = await axiosInstance.get(BASE_URL+"/todos")
    return res.data.data
  } catch(error){
    console.error("[GET todo fail]: ",error)
  }

}
export const createTodo = async (payLoad) => {
  const {title, isDone} = payLoad
  try{
    const res = await axiosInstance.post(BASE_URL+"/todos",{title, isDone} )
    return res.data
  } catch(error){
    console.error("[POST todo fail]: ", error)
  }
}

export const patchTodo = async (payLoad) => {
  const {id, title, isDone} = payLoad
  try{
    const res = await axiosInstance.patch(BASE_URL+"/todos/"+id, {title, isDone})
    console.log(BASE_URL+"todos/"+id)
    return res.data
  } catch (error){
    console.error("[PATCH todo fail]: ",error)
  }
}

export const deleteTodo = async (id) => {
  try{
    const res = await axiosInstance.delete(BASE_URL+"/todos/"+id)
    return res.data
  } catch(error){
    console.error("[DELETE todo fail]: ",error)
  }

}

