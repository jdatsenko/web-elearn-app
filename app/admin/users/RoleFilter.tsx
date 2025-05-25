import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface RoleFilterProps {
  roleFilter: string;
  setRoleFilter: (value: string) => void;
}

const RoleFilter: React.FC<RoleFilterProps> = ({
  roleFilter,
  setRoleFilter,
}) => (
  <Select onValueChange={setRoleFilter} value={roleFilter}>
    <SelectTrigger>
      <SelectValue placeholder="Filter podľa roly" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Rola</SelectLabel>
        <SelectItem value="all">Všetky</SelectItem>
        <SelectItem value="ADMIN">Admin</SelectItem>
        <SelectItem value="TEACHER">Učiteľ</SelectItem>
        <SelectItem value="USER">Používateľ</SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
);

export default RoleFilter;
