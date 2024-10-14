import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faIndianRupeeSign} from '@fortawesome/free-solid-svg-icons'

interface CardProps{
    title:string;
    amount:number;
}

const Card:React.FC<CardProps>=({title,amount})=>{
    return (
        <div className='border px-6 py-4 shadow-lg text-blue-950'>
            <div className='text-xl font-semibold'>{title}</div>
            <div className='text-4xl font-semibold flex'>
               <FontAwesomeIcon icon={faIndianRupeeSign} style={{ width: '16px', height: '25px',marginTop:'10px' }} /> 
               <div> {amount}</div>
            </div>
          </div>
    )
}

export default Card;