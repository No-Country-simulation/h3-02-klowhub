'use client';

import { Group, Root, Value } from '@radix-ui/react-select';
import SelectContent from './SelectContent';
import SelectItem from './SelectItem';
import SelectLabel from './SelectLabel';
import SelectScrollDownButton from './SelectScrollDownButton';
import SelectScrollUpButton from './SelectScrollUpButton';
import SelectSeparator from './SelectSeparator';
import SelectTrigger from './SelectTrigger';

const Select = Root;

const SelectGroup = Group;

const SelectValue = Value;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
