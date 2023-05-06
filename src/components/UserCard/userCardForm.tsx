import { Avatar, Box, Flex, HStack, Spacer, Text, VStack } from "@chakra-ui/react";
import { Select } from "../Form/Select";
import { useUsers } from "../../hooks/useUsers";
import { Ref, forwardRef, useImperativeHandle, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../services/firebase";
import { Roles } from "../../contexts/AuthContext";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../services/queryClient";
import { useAuth } from "../../hooks/useAuth";

export interface FormRefProps {
    onSave: () => Promise<void>;
}

function UserCardFormComponent({ }, ref: Ref<FormRefProps>) {
    const { user: currentUser } = useAuth()
    const { selectedUser: user } = useUsers()
    const [userType, setUserType] = useState(user.userType)

    const updateUserType = useMutation(async function () {
        //TODO: Create Error Object and show message error on save
        if (!Object.keys(Roles).includes(userType)) throw 'Invalid User type.'

        await setDoc(doc(db, "user", user.id), { ...user, userType })
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(['users', currentUser?.uid])
        }
    })

    const onSave = updateUserType.mutateAsync;

    useImperativeHandle(ref, () => ({ onSave }), [userType])

    return (
        <VStack
        >
            <HStack
                h="80px"
                mx="auto"
            >
                <Avatar name={`${user.name} ${user.lastName}`} />

                <Spacer />

                <Box textAlign="left">
                    <Text fontSize="md">{`${user.name} ${user.lastName}`}</Text>
                    <Text fontSize="sm" fontWeight="normal" color="gray.400">{user.email}</Text>
                </Box>

            </HStack>

            <Select
                name="userType"
                placeholder='Selecione um tipo'
                label="Tipo"
                value={userType}
                onChange={e => setUserType(e.target.value)}
            >
                {Object.keys(Roles).map(role => (
                    <option value={role} key={Roles[role]}>{Roles[role]}</option>
                ))}
            </Select>
        </VStack>
    )
}

export const UserCardForm = forwardRef(UserCardFormComponent)