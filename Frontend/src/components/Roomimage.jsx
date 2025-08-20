const RoomImg = ()=> {
  const handleSubmit=async()=>{
    try{

    }catch(error){

    }
    
  }
  return(
    <>
    <h1>upload images</h1>
    <label htmlFor="room1">Upload Room1 image</label>
    <input 
    type="file" 
    id="room1"
    required
    />
    <br /><br />
    <label htmlFor="room2">Upload Room2 image(optional)</label>
    <input 
    type="file" 
    id="room2"
    />
    <br /><br />

    <label htmlFor="room3">Upload Room3 image(optional)</label>
    <input 
    type="file" 
    id="room3"
    />
    <br /><br />

    <label htmlFor="toilet">upload toilet image</label>
    <input 
    type="file" 
    id="toilet"
    required
    />
    <br /><br />

    <label htmlFor="bathroom">upload bathroom image(if not attached)</label>
    <input 
    type="file" 
    id="bathroom"
    required
    />
    <br /><br />

    <label htmlFor="balcony">upload balcony image(if any)</label>
    <input 
    type="file" 
    id="balcony"
    required
    />
    <br /><br />





    </>
  )
}
export default RoomImg;