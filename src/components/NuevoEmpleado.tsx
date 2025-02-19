import { ChangeEvent, useState } from "react"
import {appsettings} from "../settings/appsettings"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { IEmpleado } from "../interfaces/IEmpleado"
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from "reactstrap"

const inicialEmpleado = {
    nombre: "",
    correo: "",
    sueldo: 0
}

export function NuevoEmpleado(){
    // Crear estado, especificamos que debe respetar el contrato de IEmpleado
    const [empleado, setEmpleado] = useState<IEmpleado>(inicialEmpleado);
    // Crear navigate para poder navegar entre paginas
    const navigate = useNavigate();

    // Metodo que permite actualizar las propiedades a través de las cajas de texto
    const inputChangeValue = (event : ChangeEvent<HTMLInputElement>) =>{
        // Obtener el nombre de la caja de texto
        const inputName = event.target.name;
        // Obtener el valor de la caja de texto
        const inputValue = event.target.value;

        // Va a devolver todas las propiedades y actualizamos el valor de la propiedad
        setEmpleado({...empleado, [inputName]: inputValue})
    }

    const guardar = async ()=> {
        const response = await fetch(`${appsettings.apiUrl}Empleado/Nuevo`,{
            method:'POST',
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
                text: "No se pudo guardar el empleado",
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
                <h4>Nuevo empleado</h4>
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