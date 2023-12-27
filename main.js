const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(<App/>)

function Counter( {item : {id, number}, hdlUpdate ,hdlDelete}) {

  const updateCounter = (n) => {
    if(countNum+n < 0) {
      return
    }
    // setCountNum( (prv)=>{
    //   console.log(prv)
    //   return prv+n
    // })
    // setCountNum( prv => prv + n)
    // console.log(countNum)
    setCountNum(countNum + n)
  }
  return (
    <div className='counter'>
       <button className='btn-dec' onClick = {()=>hdlUpdate(id,-1)}> - </button>
       <h3>{number}</h3>
       <button className='btn-inc' onClick = {()=>hdlUpdate(id,1)}> + </button>
       <button className='btn-clr' onClick = {()=>hdlUpdate(id,-number)}> C </button>
       <button className='btn-rem' onClick={hdlDelete}> X </button>
    </div>
   )
}



function SumInfo({ total, color, size })  {
    const stTitle = {
      color : color,
      fontSize : size === 'big' ? '50px' : '40px'
    }
    return (
        <div className='suminfo'>
      {/* <h1 style={stTitle}>Sum = 0</h1> */}
      <h1 style={stTitle}>Sum = {total}</h1>
      </div>
    )
  }


function App() {
    const [counters,setCounters] = React.useState([{id: 1, number: 0}])
    const hdlUpdate =(id,num) =>{
     const cloneCounters =[...counters]
     let idx = cloneCounters.findIndex(el => el.id === id)
     if (cloneCounters[idx].number + num < 0) {
        return;
      }
     console.log(idx, num)
     cloneCounters[idx].number += num
     setCounters(cloneCounters)
    }
    
  
    const getTotal = () => {
      return counters.reduce((acc, curr) => acc + curr.number, 0);
    }
  
    const hdlAddCounter = () => {
      let newId = counters.length === 0 ? 1 : counters.at(-1).id + 1;
      const cloneCounters = [...counters];
      cloneCounters.push({id: newId, number: 0});
      setCounters(cloneCounters);
    }
  
    const hdlDeleteCounter = (idToDelete) => {
      const updatedCounters = counters.filter(counter => counter.id !== idToDelete);
      setCounters(updatedCounters);
    }
  
    return (
      <>
        <h1 className='text-center'>Codecamp Academy 01</h1>
        <button className='btn-add' onClick={hdlAddCounter}>Add Counter</button>
        <SumInfo total={getTotal()} color="red" size="mediem"/> 
        {counters.map(el => (
            <Counter key={el.id} item={el} hdlUpdate={hdlUpdate} hdlDelete={() => hdlDeleteCounter(el.id)}/>
        ))}
      </>
    )
  }