"use client";

import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { IReport, ReportStatus } from "../types";
import { useReport } from "../hooks/useReport";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  report: IReport | null;
}

export const ReportDetailModal = ({ isOpen, onClose, report }: Props) => {
  const { updateStatus } = useReport();

  if (!report) return null;

  /**
   * Mengupdate status laporan dengan tipe data yang aman (ReportStatus)
   */
  const handleUpdateStatus = async (newStatus: ReportStatus) => {
    const res = await updateStatus(report._id, newStatus);

    if (res.success) {
      toast.success(
        `Status laporan berhasil diperbarui menjadi ${newStatus.replace("_", " ")}`,
      );
      onClose();
    } else {
      toast.error(res.error || "Gagal memperbarui status laporan.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Detail Laporan Kejadian"
      size="lg"
      footer={
        <Button variant="outline" onClick={onClose}>
          Tutup
        </Button>
      }>
      <div className="space-y-6">
        {/* Gallery Foto Dokumentasi */}
        <div className="grid grid-cols-2 gap-4">
          {report.photos.map((url, idx) => (
            <div
              key={idx}
              className="relative aspect-video rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <Image
                src={url}
                alt={`Bukti Laporan ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 400px"
              />
            </div>
          ))}
        </div>

        {/* Deskripsi Laporan */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
            Deskripsi Kejadian
          </label>
          <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl text-sm leading-relaxed text-zinc-700 dark:text-zinc-300 border border-zinc-100 dark:border-zinc-800">
            &ldquo;{report.description}&rdquo;
          </div>
        </div>

        {/* Informasi Metadata Laporan */}
        <div className="p-4 border border-zinc-200 dark:border-zinc-800 rounded-xl space-y-3 text-xs bg-white dark:bg-zinc-900">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Nama Pelapor:</span>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {report.user.fullname}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500">Waktu Kejadian:</span>
            <span className="text-zinc-900 dark:text-zinc-100">
              {new Date(report.reportTime).toLocaleString("id-ID", {
                dateStyle: "long",
                timeStyle: "short",
              })}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-zinc-500">Lokasi Alamat:</span>
            <span className="text-right max-w-50 text-zinc-900 dark:text-zinc-100 leading-tight">
              {report.address || "Alamat tidak tersedia"}
            </span>
          </div>
        </div>

        {/* Panel Aksi Admin */}
        <div className="pt-4 border-t dark:border-zinc-800">
          <label className="text-[10px] font-bold text-zinc-400 uppercase mb-3 block text-center">
            Perbarui Status Laporan
          </label>
          <div className="flex flex-wrap gap-2">
            <Button
              className="flex-1 min-w-30"
              variant="success"
              onClick={() => handleUpdateStatus("resolved")}>
              Selesaikan
            </Button>
            <Button
              className="flex-1 min-w-30"
              variant="danger"
              onClick={() => handleUpdateStatus("rejected")}>
              Tolak
            </Button>
            <Button
              className="flex-1 min-w-30"
              variant="outline"
              onClick={() => handleUpdateStatus("in_progress")}>
              Proses
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
