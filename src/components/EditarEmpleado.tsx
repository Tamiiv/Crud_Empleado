import { ChangeEvent, useEffect, useState } from "react"
import {appsettings} from "../settings/appsettings"
import { useNavigate, useParams } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const inicialEmpleado = {
    idEmpleado: 0,
    nombre: "",
    correo: "",
    sueldo: 0
}

export function EditarEmpleado(){

    // Recibimos el id con useParams
    const {id} = useParams<{id:string}>()
    const [empleado,setEmpleado] = useState<IEmpleado>(inicialEmpleado);
    const navigate = useNavigate();

    // Ejecuta una función cuando se renderice el componente
    useEffect(() =>{
        // Obtener el empleado por medio del ID
        const obtenerEmpleado = async()=>{
            const response = await fetch(`${appsettings.apiUrl}Empleado/Obtener/${id}`)
            if(response.ok){
                const data = await response.json();
                setEmpleado(data);
            }
        }

        obtenerEmpleado()
    },[id])

    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>) =>{
        // Obtener el nombre de la caja de texto
        const inputName = event.target.name;
        // Obtener el valor de la caja de texto
        const inputValue = event.target.value;

        // Va a devolver todas las propiedades y actualizamos el valor de la propiedad
        setEmpleado({...empleado, [inputName]: inputValue})
    }

    const guardar = async ()=> {
            const response = await fetch(`${appsettings.apiUrl}Empleado/Editar`,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(empleado)
            })
            if(response.ok){
                navigate("/")
            }
            else {
                Swal.fire({
                    title:"Error!",
                    text: "No se pudo editar el empleado",
                    icon: "warning"
                });
            }
    }

    const volver = ()=> {
        navigate("/")
    }
        
    return (
        <Container className="mt-5">
            <Row>
                <Col sm={{size:8, offset:2}}>
                <h4>Editar empleado</h4>
                <hr/>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input typoe="text" name="nombre" onChange={inputChangeValue} value={empleado.nombre}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Correo</Label>
                        <Input typoe="text" name="correo" onChange={inputChangeValue} value={empleado.correo}/>
                    </FormGroup>
                    <FormGroup>
                        <Label>Sueldo</Label>
                        <Input typoe="text" name="sueldo" onChange={inputChangeValue} value={empleado.sueldo}/>
                    </FormGroup>
                </Form>
                <Button color="primary" className="me-4" onClick={guardar}>Guardar</Button>
                <Button color="secondary" onClick={volver}>Volver</Button>
                </Col>
            </Row>
        </Container>
    )
}