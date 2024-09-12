import SectionWrapper from "./SectionWrapper"

export default function Workout({ workout }) {
  return (
    <SectionWrapper 
    header={"Welcome to"} 
    title={['The', 'DANGER', 'Zone']}
    >
      <div className="flex flex-col gap-4">
        {
          workout.map((exercise, i) => {
            return (
              'workout'
            )
          })
        }
      </div>
    </SectionWrapper>
  )
}