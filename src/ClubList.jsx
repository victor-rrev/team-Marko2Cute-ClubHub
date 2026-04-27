import './ClubList.css'
import {useState} from 'react'
function ClubList({name,description,categories,time,location}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="Card" 
          onClick={() => setIsOpen(true)} 
          style={{ cursor: 'pointer' }}>
        <div className="top">
          <h1>{name}</h1>
          <h3>{time}, @{location}</h3>  
        </div>
        
        <i className="heart"></i>
        {/*{categories.map((item,index)=>(
          <div key={item} className="card">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
          </div>
        ))}*/}
        <h5>#{categories}</h5>
        <div id="clubdesc">
          <p>{description}</p>
        </div>
      </div>
      {isOpen && (
        <div className="popup-overlay" onClick={() => setIsOpen(false)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h2>Popup Content</h2>
            <button onClick={() => setIsOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </>
  )
}
/*      <div className='Card'>
            <h2>{name}</h2>
            <p>Description: {description}</p>
            <button onClick={() => setCount(count+1)}>Add {name} to cart</button>
            <button onClick={()=>setCount(0)}>Reset</button>
            <p>Total {name}: {count}</p>
        </div>*/
export default ClubList