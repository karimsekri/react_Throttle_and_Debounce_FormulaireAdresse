import { useEffect, useState } from "react"
import {useDebounce} from 'usehooks-ts'

const AdresseForm = (props:{adresse: string, onAdresseChange: (newAdresse: string) => void}) => {
   
    const [propositions, setpropositions] = useState<string[]>([''])
    const debouncedAdresse = useDebounce<string>(props.adresse, 500)

    useEffect( () => {
        const getVilleApi = async () => {
            const reponse = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${debouncedAdresse}`);
            const adresses = await reponse.json();
            // console.log(adresses.features)
            setpropositions(adresses.features.map((adresses: any) => adresses.properties.label))
        }

        if (props.adresse.length > 3) {
            getVilleApi()
        }
    
    }, [debouncedAdresse])

    useEffect(() => {
        console.log("propositions", propositions);
        if (propositions.length > 0 && propositions[0] === props.adresse) {
            console.log("toto", propositions[0])
            setpropositions([])
         
        }
    }, [propositions, props.adresse])

    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log("onFormChange", event.target.value)
        props.onAdresseChange(event.target.value)
    }

    return (
        <div>
            <input type="text" value={props.adresse} onChange={handleChangeForm} />
            
            {propositions.map((proposition: string, index: number) => (
                <div key={index} onClick={()=>{props.onAdresseChange(proposition)}}>{proposition}</div>
                
                
            ))}
        </div>
    )
}


export default AdresseForm