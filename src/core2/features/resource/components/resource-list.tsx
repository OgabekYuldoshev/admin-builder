import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  Skeleton,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { parseAsInteger, useQueryStates } from "nuqs";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { DataTable } from "../../../components";
import { appConfig } from "../../../config";
import { useDataTable } from "../../../hooks";
import type { Resource } from "../../../types";
import { QUERY_KEY } from "../constants";
import { useDelete, useList } from "../hooks";

interface ResourceListProps {
  resource: Resource;
}

// Action cell komponenti
function ActionCell({
  item,
  resource,
  resourceName,
}: {
  item: any;
  resource: Resource;
  resourceName: string;
}) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  // ID ni topish
  const itemId = item.id || item._id || String(item[Object.keys(item)[0]]);

  const { mutateAsync: deleteItem, isPending: isDeleting } = useDelete({
    resource,
    id: itemId,
    onSuccess: () => {
      // List va single query'larni invalidate qilish
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, resource.key, "list"],
      });
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY, resource.key, "single", itemId],
      });
      setDeleteModalOpen(false);
      notifications.show({
        title: "O'chirildi",
        message: `${resource.config.label} muvaffaqiyatli o'chirildi`,
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Xatolik",
        message: error.message,
        color: "red",
      });
    },
  });

  const handleDelete = () => {
    deleteItem();
  };

  return (
    <>
      <Group gap="xs">
        <Tooltip label="Tahrirlash">
          <ActionIcon
            variant="light"
            color="blue"
            onClick={() => navigate(`/${resourceName}/${itemId}/update`)}
          >
            <IconEdit size={16} />
          </ActionIcon>
        </Tooltip>
        <Tooltip label="O'chirish">
          <ActionIcon
            variant="light"
            color="red"
            onClick={() => setDeleteModalOpen(true)}
            loading={isDeleting}
          >
            <IconTrash size={16} />
          </ActionIcon>
        </Tooltip>
      </Group>

      <Modal
        opened={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="O'chirishni tasdiqlash"
        centered
      >
        <Text mb="md">
          Haqiqatan ham "{resource.config.label}" ni o'chirmoqchimisiz?
        </Text>
        <Group justify="flex-end">
          <Button
            variant="subtle"
            onClick={() => setDeleteModalOpen(false)}
            disabled={isDeleting}
          >
            Bekor qilish
          </Button>
          <Button color="red" onClick={handleDelete} loading={isDeleting}>
            Ha, o'chirish
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export function ResourceList({ resource }: ResourceListProps) {
  const { resourceName = "" } = useParams<{ resourceName: string }>();
  const [queries] = useQueryStates({
    page: parseAsInteger.withDefault(appConfig.list.defaultPage),
    limit: parseAsInteger.withDefault(appConfig.list.defaultPageSize),
  });

  const { items, total, limit, isFetched } = useList({
    resource,
    params: { page: queries.page, limit: queries.limit },
  });

  // Action column qo'shish
  const columnsWithActions = useMemo<ColumnDef<any>[]>(() => {
    const baseColumns = resource.config.list.columns;

    // Action column
    const actionColumn: ColumnDef<any> = {
      id: "actions",
      header: "Amallar",
      enablePinning: true,
      size: 10,
      cell: ({ row }) => (
        <ActionCell
          item={row.original}
          resource={resource}
          resourceName={resourceName}
        />
      ),
    };

    return [...baseColumns, actionColumn];
  }, [resource, resourceName]);

  const table = useDataTable({
    data: items,
    columns: columnsWithActions,
    pageCount: Math.ceil(total / limit),
    enableColumnPinning: true,
    initialState: {
      columnPinning: {
        right: ["actions"],
      },
    },
  });

  if (!isFetched) {
    return (
      <Flex justify="center" align="center" h={400}>
        <Loader size="sm" />
      </Flex>
    );
  }

  return <DataTable table={table} />;
}
