import { useState } from "react"
import Button from "./Button"
import SectionWrapper from "./SectionWrapper"
import { WORKOUTS, SCHEMES } from "../utils/swoldier"

function Header({ index, title, description }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2">
        <p className="text-3xl sm:text-4xl md:text-5xl font-semibold text-slate-400">{index}</p>
        <h4 className="text-xl sm:text-2xl md:text-3xl">{title}</h4>
      </div>
      <p className="text-sml sm:text-base mx-auto">{description}</p>
    </div>
  )
}

export default function Generator() {
  const [showModal, setShowModal] = useState(false);
  const [poison, setPoison] = useState('individual');
  const [muscles, setMuscles] = useState([]);
  const [goal, setGoal] = useState('strength_power');

  function toggleModal() {
    setShowModal(!showModal);
  }

  function updateMuscles(muscleGroup) {
    if (muscles.includes(muscleGroup)) {
      setMuscles(muscles.filter(val => val !== muscleGroup));
      return;
    }

    if (muscles.length > 2) {
      return;
    }

    if (poison !== 'individual') {
      setMuscles([muscleGroup])
      setShowModal(false);
      return;
    }

    setMuscles([...muscles, muscleGroup]);

    if (muscles.length === 2) {
      setShowModal(false);
    }

    console.log(muscles);
  }

  return (
    <SectionWrapper 
      header={"generate your workout"} 
      title={['It\'s', 'Huge', 'o\'clock']}
    >
      <Header
        index={'01'}
        title={'Pick your poison.'}
        description={'Select the workout you wish to endure.'}
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
        {
          Object.keys(WORKOUTS).map((type, typeIndex) => {
            return (
              <button 
                className={'bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg ' + (type === poison ? 'border-blue-600' : 'border-blue-400')} 
                key={typeIndex}
                onClick={() => {
                  setPoison(type);
                  setMuscles([]);
                }}
              >
                <p className="capitalize">
                  {type.replaceAll('_', ' ')}
                </p>
              </button>
            )
          })
        }
      </div>
      <Header
        index={'02'}
        title={'Lock on targets.'}
        description={'Select the muscles judged for annihilation.'}
      />
      <div className="bg-slate-950 border border-solid border-blue-400 rounded-lg flex flex-col">
        <button 
          className="relative p-3 flex items-center justify-center"
          onClick={toggleModal}
        >
          <p className="capitalize">
            {muscles.length === 0 ? 'Select muscle groups' : muscles.join(' ')}
          </p>
          <i className="fa-solid absolute right-3 top-1/2 -translate-y-1/2 fa-caret-down"></i>
        </button>
        {
          showModal && (
            <div className="flex flex-col px-3 pb-3">
              { 
                (poison === 'individual' ? WORKOUTS[poison] : Object.keys(WORKOUTS[poison])).map((muscleGroup, muscleGroupIndex) => {
                  return (
                    <button 
                      key={muscleGroupIndex}
                      className={"hover:text-blue-400 duration-200 " + (muscles.includes(muscleGroup) ? 'text-blue-400' : '') }
                      onClick={() => {
                        updateMuscles(muscleGroup);
                      }}
                    >
                      <p className="uppercase">
                        {muscleGroup.replaceAll('_', ' ')}
                      </p>
                    </button>
                  )
                })
              }
            </div>
          )
        }
      </div>
      <Header
        index={'03'}
        title={'Become juggernaut.'}
        description={'Select your ultimate objective.'}
      />
      <div className="grid grid-cols-2 gap-4">
      {
          Object.keys(SCHEMES).map((scheme, schemeIndex) => {
            return (
              <button 
                className={'bg-slate-950 border duration-200 hover:border-blue-600 py-3 rounded-lg ' + (scheme === goal ? 'border-blue-600' : 'border-blue-400')} 
                key={schemeIndex}
                onClick={() => {
                  setGoal(scheme);
                }}
              >
                <p className="capitalize">
                  {scheme.replaceAll('_', ' ')}
                </p>
              </button>
            )
          })
        }
      </div>
    <Button text="Formulate" />
    </SectionWrapper>
  )
}