import {
  ActionIcon,
  Box,
  Button,
  Flex,
  Group,
  Loader,
  Modal,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconAlertTriangle, IconEdit, IconTrash } from "@tabler/icons-react";
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

  const itemId = item.id || item._id || String(item[Object.keys(item)[0]]);

  const { mutateAsync: deleteItem, isPending: isDeleting } = useDelete({
    resource,
    id: itemId,
    onSuccess: () => {
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
        onClose={() => !isDeleting && setDeleteModalOpen(false)}
        title={
          <Group gap="xs">
            <IconAlertTriangle size={20} color="var(--mantine-color-red-6)" />
            <Text fw={600} size="lg">
              O'chirishni tasdiqlash
            </Text>
          </Group>
        }
        centered
        closeOnClickOutside={!isDeleting}
        closeOnEscape={!isDeleting}
        withCloseButton={!isDeleting}
      >
        <Stack gap="md">
          <Box
            p="md"
            style={{
              borderRadius: "var(--mantine-radius-md)",
              backgroundColor: "var(--mantine-color-red-0)",
            }}
          >
            <Group gap="xs" align="flex-start">
              <IconAlertTriangle
                size={24}
                color="var(--mantine-color-red-6)"
                style={{ marginTop: 2 }}
              />
              <Text size="sm" c="dimmed" style={{ flex: 1 }}>
                Bu amalni qaytarib bo'lmaydi. Haqiqatan ham{" "}
                <Text span fw={600} c="red">
                  "{resource.config.label}"
                </Text>{" "}
                ni o'chirmoqchimisiz?
              </Text>
            </Group>
          </Box>

          <Group justify="flex-end" gap="sm" mt="md">
            <Button
              onClick={() => setDeleteModalOpen(false)}
              disabled={isDeleting}
            >
              Bekor qilish
            </Button>
            <Button
              color="red"
              onClick={handleDelete}
              loading={isDeleting}
              leftSection={<IconTrash size={16} />}
            >
              Ha, o'chirish
            </Button>
          </Group>
        </Stack>
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
