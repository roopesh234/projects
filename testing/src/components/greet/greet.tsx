
type GreetProps = {
    name? : string
}

export const Greet = (props : GreetProps) => {
    return (
        <div>
            <h1>Hello {props.name} </h1>
        </div>
    )
}