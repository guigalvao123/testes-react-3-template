import { render, screen, waitFor } from "@testing-library/react"
import UserCard from "../components/UserCard"
import axios from "axios"

jest.mock("axios")

const axiosResponseMock = {
    data: {
        firstName: "Primeiro",
        lastName: "Ultimo",
        bank: {
            cardNumber: "0000 0000 0000 0001",
            cardExpire: "12/23"
        }
    }
}

describe("User Card", () => {
    test("Teste para iniciar o loading e depois renderizar o card", async () => {
        axios.get.mockResolvedValueOnce(axiosResponseMock)

        render(<UserCard />)
        const loadging = screen.getByText(/loading\.\.\./i)
        expect(loadging).toBeInTheDocument()
        screen.debug()
        //screen.logTestingPlaygroundURL()

        await waitFor(() => { })
        //screen.logTestingPlaygroundURL()
        const name = screen.getByText(/primeiro ultimo/i)
        const cardNumber = screen.getByText(/0000 000 0 00 00 0 001/i)
        const cardExpire = screen.getByText(/12\/23/i)

        expect(name).toBeInTheDocument()
        expect(cardNumber).toBeInTheDocument()
        expect(cardExpire).toBeInTheDocument()
        screen.debug()
    })
})