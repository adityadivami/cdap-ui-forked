import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from "framer-motion";
import Liv from '../../../../../assets/images/png/liv.png';
import LeftArrow from '../../../../../assets/images/png/leftArrow.png';
import AddIcon from '../../../../../assets/images/png/AddIcon.png';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import { variants } from '../../../../../constants/CategoryList'
import { getBrokerList } from '../../../../../redux/actions/auth'
import UserNavBar from '../../../../NavigationBar'


const AddBroker = (props) => {
    const [current, setCurrentStep] = useState(0)

    const next = (registerData) => {
        setCurrentStep(current + 1);
    };

    const prev = () => {
        setCurrentStep(current - 1);
    };

    let steps = [
        {
            title: "Step First",
            content: (
                <Step1
                    next={(brokerList) => { setbrokerList(brokerList); next() }}
                    {...props}
                />
            ),
        },
        {
            title: "Step Second",
            content: (
                <Step2 next={(registerData) => next(registerData)}
                    {...props} 
                />
            ),
        },
        {
            title: "Step Third",
            content: (
                <Step3 next={() => setCurrentStep(0)}
                    {...props}
                    registrationData={registrationData}
                    brokerList={brokerList}
                />
            ),
        },

    ];

    useEffect(() => {
        let id = localStorage.getItem('userId')
        if (id === null) {
            history.push('/signin')
        }
        getBrokers()
    }, [])




    return (
        <div style={{zIndex: '2'}}>
            {/* <div className="border-Div">
                <img src={Liv} />
            </div> */}
            <UserNavBar show={true} callNext={() => {}} />
            <div className='Max-Width-Container'>
                <div className="PreviousArrow"
                    onClick={() => {
                        if (current > 0) {
                            prev()
                        } else {
                            history.goBack()
                            // if(origin.state == 'SelectedPlanAll'){
                            //     history.push({pathname:'/doughnutgraph', state: 'SelectedPlanAll'})
                            // }
                            // else if(origin.state == 'SelectedPlanOneTwo'){
                            //     history.push({pathname:'/doughnutgraph', state: 'SelectedPlanOneTwo'})
                            // }
                            // else if(origin.state == 'onBoarding' || origin.state == 'SelectedPlanThree'){
                            //     history.push({pathname:'/api-data'})
                            // }
                            // else{
                            //     history.push({pathname:'/dashboard', state: {isDocument: true, activeState: 3}})
                            // }
                        }
                    }}
                >
                    <div className="ArrowBorder">
                        <img src={LeftArrow} alt="img" />
                    </div>
                {current != 0 && <div className="CurrencyBox"
                        style={{ transform: 'rotate(45deg)' }}
                        onClick={() => {
                            if (current > 0) {
                                prev()
                            }
                            else if(origin.state == 'onBoarding' || origin.state == 'SelectedPlanThree' || origin.state == 'SelectedPlanOneTwo' || origin.state == 'SelectedPlanAll'){
                                history.goBack()
                            }
                            else{
                                history.push({pathname:'/dashboard', state: {isDocument: true, activeState: 3}})
                            }
                        }
                        
                        }>
                        <img src={AddIcon} alt="img" />
                    </div> }
                </div>
                <AnimatePresence exitBeforeEnter initial={true}>
                    <motion.div
                        initial="init"
                        animate="exist" variants={variants}
                    >
                        {steps[current].content}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}


export default AddBroker