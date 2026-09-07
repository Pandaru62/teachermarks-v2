import { useQuery } from "@tanstack/react-query";
import DashboardInterface from "../../interfaces/dashboard.interface";
import getDashboardData from "../../api/dashboard";

export default function useDashboardQuery() {

    const {
        data: dashboard,
        isLoading: dashboardLoading,
        isError: dashboardError,
      } = useQuery<DashboardInterface>({
        queryKey: ["dashboard"],
        queryFn: () => getDashboardData(),
      });

    return( 
        {dashboard,
        dashboardLoading,
        dashboardError})
  }