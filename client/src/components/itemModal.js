import React, {Component} from 'react'
import {
    Button,Modal,ModalHeader,ModalBody,Form,FormGroup,Label,Input
} from 'reactstrap'
import {connect} from 'react-redux'
import {addItem} from '../actions/itemActions'
//import {v1 as uuid} from 'uuid'

class ItemModal extends Component {
    state = {
        modal:false,
        name: ''
    }

    //!this.state.modal -> uvek suprotno od vrednosti modal
    toggle = () => {
        this.setState({
            modal:!this.state.modal
        })
    }

    //e ili event
    //target je u ovom slucaju Input, jer je nad njim obavljena funkcija onChange
    //menjamo vrednost parametra name iz state-a
    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault()

        const newItem = {
            /*id ne treba da se navodi jer mongodb ima svoj id*/
            /*id:uuid(),*/
            name:this.state.name
        }

        //Add item via addItem actions
        this.props.addItem(newItem)

        //Close the modal
        this.toggle()
    }

    render(){
        return(
            <div>
                <Button color="dark" style={{marginBottom:'2rem'}} onClick={this.toggle}>
                    Add Item
                </Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Add to Shopping List
                        <ModalBody>
                            <Form onSubmit={this.onSubmit}> 
                                <FormGroup>
                                    <Label for="item">Item</Label>
                                    <Input type="text" name="name" id="item" placeholder="Add Shopping Item" onChange={this.onChange}/>
                                    <Button color="dark" style={{marginTop:'2rem'}} block>Add Item</Button>
                                </FormGroup>
                            </Form>
                        </ModalBody>
                    </ModalHeader>
                </Modal>
            </div>
        )
    }
}

//sve vrednosti iz state-a ubacuje da budu deo props-a da bi se moglo nad njima rukovati
const mapStateToProps = state => ({
    item:state.item
})

export default connect(mapStateToProps,{addItem})(ItemModal)