import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { FaSearch, FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import CityInput from '../components/CityInput'
import Logo from '../components/Logo'
import PwdInput from '../components/PwdInput'
import UserCard from '../components/UserCard'
import UserInput from '../components/UserInput'
import styles from './users.module.css'
import { Context } from '../Context/AuthContext'

export default function Users() {
    const { authenticated, handleLogin, handleLogOut } = useContext(Context)
    const [users, setUsers] = useState(null)
    const [search, setSearch] = useState('')
    const [isloading, setIsLoading] = useState(true)
    const [filter, setFilter] = useState('active')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [cidade, setCidade] = useState('')
    const navigate = useNavigate()


    function ordenaPorNome(a, b) {
        if (a.username < b.username)
            return -1;
        if (a.username > b.username)
            return 1;
        return 0;
    }


    useEffect(() => {

        if (isloading) {
            axios.get(import.meta.env.VITE_API_ADDRESS)
                .then((response) => {
                    setUsers(response.data.response.users.sort(ordenaPorNome))
                    setIsLoading(false)
                })

        }

    }, [isloading])


    if (!users) return (
        <h1>Carregando...</h1>
    )

    function filterAll() {
        return users.filter((filtered) => filtered.username.toLowerCase().includes(search.toLowerCase())
            && !filtered.username.toLowerCase().includes('#')
        )
    }

    function filterBlocked() {
        return users.filter((filtered) => filtered.username.toLowerCase().includes(search.toLowerCase())
            && filtered.username.toLowerCase().includes('#')
        )
    }

    async function deleteUser(id, username) {
        if (!confirm(`Confirma a remo????o do usu??rio: ${username}?`)) return
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_ADDRESS}/${id}`);
            console.log(response.data);
            alert(`Usu??rio ${username} removido com sucesso!`)
            setIsLoading(true)
        } catch (e) {
            alert(`???? Axios request failed: ${e}`);
        }

    }
    async function blockUser(username, id) {
        if (!confirm(`Confirma o bloqueio do usu??rio: ${username}?`)) return
        try {
            const response = await axios.patch(import.meta.env.VITE_API_ADDRESS,
                { username: '#' + username, id: id });
            console.log(response.data);
            alert(`Usu??rio ${username} bloqueado com sucesso!`)
            setIsLoading(true)
        } catch (e) {
            alert(`???? Axios request failed: ${e}`);
        }
    }

    async function unblockUser(username, id) {
        if (!confirm(`Confirma o desbloqueio do usu??rio: ${username}?`)) return
        try {
            const response = await axios.patch(import.meta.env.VITE_API_ADDRESS,
                { username: username.replace('#', ''), id: id });
            console.log(response.data);
            alert(`Usu??rio ${username} desbloqueado com sucesso!`)
            setIsLoading(true)
        } catch (e) {
            alert(`???? Axios request failed: ${e}`);
        }
    }

    async function createUser() {
        if (!username || !password || !cidade) return alert('Todos os campos s??o obrigat??rios!')
        try {
            const response = await axios.post(import.meta.env.VITE_API_ADDRESS,
                { username: username, password: password, cidade: cidade });
            console.log(response.data);
            alert(`Usu??rio ${username} criado com sucesso!`)
            setSearch(username)
            setCidade('')
            setUsername('')
            setPassword('')
            setFilter('active')
            setIsLoading(true)
        } catch (e) {
            alert(`???? Axios request failed: ${e}`);
        }
    }



    let filtered = 'active'

    if (filter == 'active') {
        filtered = filterAll()
    } else {
        filtered = filterBlocked()
    }


    return (

        <>
            <header>
                <Logo />
                <FaSignOutAlt
                    size={36}
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/')
                        handleLogOut()
                    }}
                />
            </header>
            <section className={styles.searchContainer}>
                <nav>
                    <h1>Ol??, Neo!</h1>
                    <ul>
                        <li className={filter == 'active' && styles.selected}
                            onClick={() => {
                                setFilter('active')

                            }}
                        >ATIVOS</li>
                        <li
                            className={filter == 'blocked' && styles.selected}
                            onClick={() => {
                                setFilter('blocked')

                            }}

                        >BLOQUEADOS</li>
                        <li
                            className={filter == 'add' && styles.selected}
                            onClick={() => {
                                setFilter('add')

                            }}
                        >CADASTRAR</li>
                    </ul>
                </nav>
                {filter == 'add' ?
                    <div className={styles.cadastroContainer}>
                        <h1>CADASTRO</h1>
                        <span>Usu??rio</span>
                        <UserInput
                            value={username}
                            onchange={(ev) => setUsername(ev.target.value)}
                        />
                        <span>Senha</span>
                        <PwdInput
                            value={password}
                            onchange={(ev) => setPassword(ev.target.value)}
                        />
                        <span>Cidade</span>
                        <CityInput
                            value={cidade}
                            onchange={(ev) => setCidade(ev.target.value)}
                        />
                        <button
                            onClick={createUser}
                        >Criar</button>
                    </div> :
                    <>
                        <div style={{ transform: 'translateX(-10px)', width: '100%', display: 'flex', justifyContent: 'center', position: 'relative' }}>
                            <FaSearch className={styles.icons}
                            />
                            <input type="text" name="search" id="search" autoComplete='off' placeholder='Digite para pesquisar...'
                                value={search}
                                onChange={(ev) => setSearch(ev.target.value)}
                            />
                        </div>
                        <ul>
                            {filtered.map((user) => (
                                <li key={user.id}>
                                    <UserCard id={user.id} username={user.username} cidade={user.cidade}
                                        delete={() => deleteUser(user.id, user.username)}
                                        block={() => blockUser(user.username, user.id)}
                                        unblock={() => unblockUser(user.username, user.id)} />
                                </li>
                            ))}
                        </ul>
                    </>
                }


            </section>
        </>
    )
}
