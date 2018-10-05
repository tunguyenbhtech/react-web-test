import { lifecycle, compose as recompose, withHandlers, withState } from 'recompose'
import { connect } from 'react-redux'
import { EmployeeRedux } from '../redux/reducers'
import React from 'react'
import { Table } from 'reactstrap'

const Home = ({ listEmployees, isToggle, onToogleKey, onAddNew, onDeleteEmpl, onSave, onChangeName, onChangeKey }) => (
  <div className='home-page'>
    <div className='container-fuild'>
      <div className='row'>
        <div className='col-md-3'>
          <h3>{`dsfdsfds`}</h3>
        </div>
        <div className='col-md-9'>
          <div className='content-title'>
            <h4>There API KeyId grant developers the ability to access electrica services in the Cloud. Keep Them ...</h4>
          </div>  
          <div className='wrapper-table'>
            <Table>
              <thead>
                <tr>
                  <th>{`Name`}</th>
                  <th>{`Key`}</th>
                  <th>{`Date Created`}</th>
                  <th>{`Action`}</th>
                </tr>
              </thead>
              <tbody>
                {
                  listEmployees.length > 0 && listEmployees.map((empl, idx) => (
                    <tr key={`key-${idx}`}>
                      <td>{
                        empl.isNewAdd
                          ? <input className='input-new-text' placeholder='Enter name' onChange={onChangeName} />
                          : <span>{empl.name || '---'}</span>}
                      </td>
                      <td>
                        {
                          empl.isNewAdd
                            ? <input className='input-new-text' placeholder='Enter key' onChange={onChangeKey} />
                            : (
                              <div>
                                <input disabled className='input-key' type={isToggle ? 'text' : 'password'} value={empl.key} />
                                <span className='on-toggle' onClick={onToogleKey}>{`toggle`}</span>
                              </div>
                            )
                        }
                      </td>
                      <td>{empl.dateCreated || '---'}</td>
                      <td>
                        {
                          empl.isNewAdd
                            ? <button className='btn-save' onClick={() => {onSave(idx)}}>{`Save`}</button>
                            : (
                              <div className='options-active'>
                                <button className='btn-refresh'>{`Refresh`}</button>
                                <button className='btn-delete' onClick={() => {onDeleteEmpl(idx)}}>{`Delete`}</button>
                              </div>
                            )
                        }
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
            <div className='wrapper-btn-add'>
              <button className='btn-add-new' onClick={onAddNew}>{`New`}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default recompose(
  connect(
    (state) => {
      const { listEmployees } = EmployeeRedux.getReducerState(state)
      return {
        listEmployees
      }
    },
    (dispatch) => ({
      onDelete: (idx) => (dispatch(EmployeeRedux.Creators.onDeleteClient(idx))),
      onCreate: () => (dispatch(EmployeeRedux.Creators.createNewClient())),
      onSaveClient: (client, idx) => (dispatch(EmployeeRedux.Creators.onSaveNewClient(client, idx)))
    })
  ),
  withState('addName', 'setAddname', ''),
  withState('addKey', 'setAddKey', ''),
  withState('isToggle', 'setIsToggle', false),
  withHandlers({
    onToogleKey: (props) => () => {
      props.setIsToggle(true)
    },
    onAddNew: (props) => () => {
      props.onCreate()
    },
    onChangeName: (props) => (e) => {
      props.setAddname(e.target.value)
    },
    onChangeKey: (props) => (e) => {
      props.setAddKey(e.target.value)
    },
    onDeleteEmpl: (props) => (idx) => {
      props.onDelete(idx)
    },
    onSave: (props) => (idx) => {
      console.log(';fdsfdsFSDfsdfs', idx, props.addName, props.addKey)
      props.onSaveClient(
        {
          name: props.addName,
          key: props.addKey,
          date: '2018-02-19'
        },
        idx
      )
    }
  }),
  lifecycle({
    componentDidMount () {
    }
  })
)(Home)