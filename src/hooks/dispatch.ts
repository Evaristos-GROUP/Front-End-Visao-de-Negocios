import { useDispatch } from 'react-redux';
import { CustomDispatch } from '../store';

export const CustomTsDispatch = () => useDispatch<CustomDispatch>();