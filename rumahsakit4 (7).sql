-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 08, 2025 at 04:12 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rumahsakit4`
--

-- --------------------------------------------------------

--
-- Table structure for table `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dokters`
--

CREATE TABLE `dokters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `idDokter` char(255) NOT NULL,
  `namaDokter` text NOT NULL,
  `tanggalLahir` text NOT NULL,
  `spesialisasi` text NOT NULL,
  `ruangan_id` bigint(20) UNSIGNED DEFAULT NULL,
  `lokasiPraktik` text DEFAULT NULL,
  `jamPraktik` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `dokters`
--

INSERT INTO `dokters` (`id`, `idDokter`, `namaDokter`, `tanggalLahir`, `spesialisasi`, `ruangan_id`, `lokasiPraktik`, `jamPraktik`, `created_at`, `updated_at`) VALUES
(6, '5', 'Sakina Ali Umar Amry', '2008-02-22', 'Poli Konseling', 7, 'Ruang Poli THT', '12.00', '2025-08-30 09:20:36', '2025-08-30 23:56:19'),
(13, '2', 'Maymuna Ali Umar', '1997-09-02', 'Saraf', NULL, NULL, '07:00 - 12:00', '2025-09-02 06:18:12', '2025-09-02 06:18:12'),
(14, '3', 'Dr. Layla', '1999-09-03', 'Orthopedi', NULL, NULL, '07:00 - 12:00', '2025-09-23 07:03:39', '2025-09-23 07:03:39'),
(15, '2', 'nina', '2107', 'Umum', NULL, '', 'oke', '2025-10-03 02:20:39', '2025-10-03 02:20:39'),
(16, '3', 'gxhs', '737', 'Umum', NULL, '', '08', '2025-10-03 02:21:57', '2025-10-03 02:23:06'),
(51, '2', 'zhzh', '21-07-2007', 'Umum', NULL, 'jJa', '08.00', '2025-10-03 02:43:27', '2025-10-03 02:43:27'),
(54, '15', 'munah', '1964-04-01', 'snnajs', NULL, 'ajajja', '08:00', '2025-10-07 07:21:40', '2025-10-07 07:24:58');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kunjungans`
--

CREATE TABLE `kunjungans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `pasien_id` bigint(20) UNSIGNED DEFAULT NULL,
  `keluhan` text NOT NULL,
  `requested_date` datetime NOT NULL,
  `assigned_dokter_ref` varchar(255) DEFAULT NULL,
  `status` enum('requested','assigned','cancelled','closed') NOT NULL DEFAULT 'requested',
  `responded_at` timestamp NULL DEFAULT NULL,
  `cancelled_at` timestamp NULL DEFAULT NULL,
  `closed_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `kunjungans`
--

INSERT INTO `kunjungans` (`id`, `user_id`, `pasien_id`, `keluhan`, `requested_date`, `assigned_dokter_ref`, `status`, `responded_at`, `cancelled_at`, `closed_at`, `created_at`, `updated_at`) VALUES
(44, 26, 27, 'aduh saya sakit pala', '2025-09-23 20:59:00', NULL, 'cancelled', NULL, NULL, NULL, '2025-09-23 06:59:30', '2025-09-23 06:59:39'),
(45, 26, 27, 'saya sakit jantung', '2025-09-23 20:59:00', '5', 'assigned', NULL, NULL, NULL, '2025-09-23 06:59:48', '2025-09-23 07:04:38'),
(46, 26, 27, 'jantung', '2025-09-23 22:35:00', '5', 'assigned', NULL, NULL, NULL, '2025-09-23 08:36:01', '2025-09-23 08:36:27'),
(47, 26, 27, 'sdvsssss', '2025-09-23 22:50:00', '5', 'assigned', NULL, NULL, NULL, '2025-09-23 08:51:00', '2025-09-23 08:52:07'),
(48, 26, 27, 'sakit dd', '2025-09-23 22:59:00', '5', 'assigned', NULL, NULL, NULL, '2025-09-23 08:59:13', '2025-09-23 08:59:37'),
(49, 28, 30, 'sakit  hati', '2025-10-02 20:18:00', '5', 'assigned', NULL, NULL, NULL, '2025-10-02 06:18:31', '2025-10-02 06:25:02');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_01_01_000000_add_photo_and_role_to_users_table', 1),
(5, '2025_08_08_062955_create_dokters_table', 1),
(6, '2025_08_13_004528_create_personal_access_tokens_table', 1),
(7, '2025_08_22_035648_create_ruangan_table', 1),
(8, '2025_08_22_065508_create_pasiens_table', 1),
(9, '2025_08_22_075100_alter_pasiens_nomor_kamar_nullable', 1),
(10, '2025_08_28_000001_create_kunjungans_table', 1),
(11, '2025_08_28_000002_create_pemeriksaans_table', 1),
(12, '2025_08_28_010000_alter_users_role_enum', 1),
(13, '2025_08_31_055710_add_ruangan_id_to_dokters_table', 2),
(14, '2025_08_31_060009_make_lokasi_praktik_nullable_in_dokters_table', 3),
(15, '2025_09_01_070056_add_user_id_to_pasiens_table', 4),
(16, '2025_09_01_112606_add_kunjungan_id_to_pemeriksaans_table', 5),
(17, '2025_09_02_130330_add_dayatampungtersedia_to_ruangan_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `pasiens`
--

CREATE TABLE `pasiens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `NomorRekamMedis` varchar(255) NOT NULL,
  `namaPasien` varchar(255) NOT NULL,
  `tanggalLahir` date NOT NULL,
  `jenisKelamin` enum('L','P') NOT NULL,
  `alamatPasien` varchar(255) NOT NULL,
  `kotaPasien` varchar(255) NOT NULL,
  `usiaPasien` tinyint(3) UNSIGNED NOT NULL,
  `penyakitPasien` varchar(255) NOT NULL,
  `idDokter` char(255) NOT NULL,
  `tanggalMasuk` date NOT NULL,
  `tanggalKeluar` date DEFAULT NULL,
  `nomorKamar` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pasiens`
--

INSERT INTO `pasiens` (`id`, `user_id`, `NomorRekamMedis`, `namaPasien`, `tanggalLahir`, `jenisKelamin`, `alamatPasien`, `kotaPasien`, `usiaPasien`, `penyakitPasien`, `idDokter`, `tanggalMasuk`, `tanggalKeluar`, `nomorKamar`, `created_at`, `updated_at`) VALUES
(16, NULL, 'R0001', 'ayusa', '2007-09-01', 'L', 'jln tngkil', 'batam', 18, 'Poli Konseling', '5', '2025-09-01', NULL, 'R001', '2025-09-01 04:15:56', '2025-09-01 04:16:35'),
(17, NULL, 'R0002', 'rawrr', '2010-10-03', 'P', 'gempol', 'batam', 14, 'Poli Konseling', '5', '2025-09-01', NULL, 'R001', '2025-09-01 05:06:05', '2025-09-01 05:06:05'),
(21, NULL, 'ROO69', 'ayusa', '2002-11-21', 'P', 'Jalan Kaja', 'Jakarta Timur', 22, 'Poli Konseling', '5', '2025-09-02', '2025-09-03', 'R001', '2025-09-02 06:24:22', '2025-09-02 06:27:13'),
(22, NULL, 'R0004', 'ikhsan', '2015-09-05', 'L', 'Jalan Kaja', 'Jakarta Timur', 9, 'Saraf', '2', '2025-09-01', NULL, 'R004', '2025-09-02 06:29:26', '2025-09-02 06:29:26'),
(23, 19, 'RM000019', 'Ayu Safitri', '1990-01-01', 'L', 'Belum diisi', 'Belum diisi', 35, 'Poli Konseling', '5', '2025-09-02', NULL, 'R001', '2025-09-02 06:32:19', '2025-09-02 07:10:55'),
(24, 23, 'RM000023', 'pak hilal', '1990-01-01', 'L', 'Belum diisi', 'Belum diisi', 35, 'Poli Konseling', '5', '2025-09-02', NULL, 'R001', '2025-09-02 06:38:16', '2025-09-02 07:10:36'),
(27, 26, 'RM000026', 'umar', '1990-01-01', 'L', 'Jlan Kaja', 'Jaktim', 35, 'Poli Konseling', '5', '2025-09-23', '2025-09-24', 'R001', '2025-09-23 06:58:36', '2025-09-23 16:30:44'),
(29, 27, 'RM000027', 'nafsya', '1990-01-01', 'L', 'Belum diisi', 'Belum diisi', 0, 'Belum ada diagnosis', 'DKT001', '2025-09-23', NULL, NULL, '2025-09-23 16:31:28', '2025-09-23 16:31:28'),
(30, 28, 'RM000028', 'mara', '1990-01-01', 'L', 'Belum diisi', 'Belum diisi', 21, 'Belum ada diagnosis', 'DKT001', '2025-10-02', NULL, 'null', '2025-10-02 06:17:34', '2025-10-03 02:49:49'),
(37, NULL, 'RM0827', 'haja', '1990-01-01', 'P', 'okeh', 'okeh', 12, 'okeh', '12', '1990-01-01', NULL, '101', '2025-10-07 07:43:41', '2025-10-07 07:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pemeriksaans`
--

CREATE TABLE `pemeriksaans` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kunjungan_id` bigint(20) UNSIGNED DEFAULT NULL,
  `pasien_id` bigint(20) UNSIGNED NOT NULL,
  `dokter_ref` varchar(255) NOT NULL,
  `perlu_dirawat` tinyint(1) NOT NULL DEFAULT 0,
  `ruangan_kode` varchar(255) DEFAULT NULL,
  `diagnosis` varchar(255) NOT NULL,
  `obat` text DEFAULT NULL,
  `dosis` varchar(255) DEFAULT NULL,
  `tanggal_masuk` date DEFAULT NULL,
  `tanggal_keluar` date DEFAULT NULL,
  `status_pemulihan` enum('belum_sembuh','sembuh') NOT NULL DEFAULT 'belum_sembuh',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pemeriksaans`
--

INSERT INTO `pemeriksaans` (`id`, `kunjungan_id`, `pasien_id`, `dokter_ref`, `perlu_dirawat`, `ruangan_kode`, `diagnosis`, `obat`, `dosis`, `tanggal_masuk`, `tanggal_keluar`, `status_pemulihan`, `created_at`, `updated_at`) VALUES
(35, 45, 27, '5', 0, NULL, 'Keluhan: saya sakit jantung', 'paracmtol', '3x1', '2025-09-23', '2025-09-23', 'sembuh', '2025-09-23 07:05:58', '2025-09-23 07:12:03'),
(36, 46, 27, '5', 0, NULL, 'Keluhan: jantung', 'fdgfd', 'fdgd', '2025-09-23', NULL, 'sembuh', '2025-09-23 08:48:53', '2025-09-23 08:48:53'),
(37, 47, 27, '5', 0, NULL, 'Keluhan: sdvsssss', NULL, NULL, '2025-09-23', '2025-09-23', 'sembuh', '2025-09-23 08:55:05', '2025-09-23 08:55:21'),
(38, 48, 27, '5', 0, NULL, 'Keluhan: sakit dd', 'para', '3x1', '2025-09-23', '2025-09-23', 'sembuh', '2025-09-23 09:01:34', '2025-09-23 09:01:40'),
(39, 49, 30, '5', 1, 'R001', 'Keluhan: sakit  hati', 'fe', 'efe', '2025-10-02', NULL, 'belum_sembuh', '2025-10-02 06:25:32', '2025-10-02 06:25:32');

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ruangan`
--

CREATE TABLE `ruangan` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `kodeRuangan` varchar(255) NOT NULL,
  `namaRuangan` varchar(255) NOT NULL,
  `dayaTampung` int(11) NOT NULL,
  `lokasi` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ruangan`
--

INSERT INTO `ruangan` (`id`, `kodeRuangan`, `namaRuangan`, `dayaTampung`, `lokasi`, `created_at`, `updated_at`) VALUES
(7, 'R001', 'Ruang Umum Updated', 12, 'Lantai 1 Gedung A', '2025-08-30 23:50:16', '2025-10-02 06:25:32'),
(9, 'R003', 'Ruang VIP I', 10, 'Gedung 1', '2025-08-30 23:51:26', '2025-10-03 01:37:44'),
(23, 'R002', 'Ruangan 1', 0, '', '2025-10-03 01:38:58', '2025-10-03 01:44:19'),
(25, 'R004', 'Ruang Poli Umum Anak', 0, '', '2025-10-03 01:44:43', '2025-10-03 01:44:43'),
(26, 'R005', 'Ruang Anak Balita', 0, '', '2025-10-03 01:46:19', '2025-10-03 01:55:15'),
(28, 'R09', 'y', 0, '', '2025-10-03 02:23:49', '2025-10-03 02:23:49'),
(29, 'R009', 'okekk', 0, '', '2025-10-07 07:17:33', '2025-10-07 07:18:04'),
(33, 'R0076', 'anggrek', 0, '', '2025-10-07 20:21:46', '2025-10-07 20:21:46');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('59OjGMqaow0XeuOd62Sf4LG9hfsbv8c4wyAVKpqV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiS2tZZG9EYjJtSVJDZUQ5Uk1hYTYxRkhrTEY4S2hmaENhbktvTEpLbCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fX0=', 1759411788),
('ArNfa8hph3CFH6nqzbe17zGu8OdG96h10eO6PlZZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoicGwzNkhmcVBqaEpyWVVjQVFLeVYzZ2pIM2kyeFlZejNTcFczUEhrTyI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1759462662);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `role` enum('admin','operator','dokter','user') NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `photo`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Dr. Joko', 'dokter@example.com', '1756714871_e8925d8a35c59e359b8cb946d15abe97.jpg', 'dokter', NULL, '$2y$12$N7FZA5J54tlvCoQH9ipDtOxNTz2ZEtA9R4ArDacEsR9MfzZXKFz3q', NULL, '2025-08-30 13:45:42', '2025-09-01 01:21:11'),
(2, 'Operator', 'operator@gmail.com', '1756616104_calculatoraplikasi.png', 'operator', NULL, '$2y$12$iudOU/9Ax5ewSM2JZI0ZZ.5YaA0gyTl1Cf1FHD2H9cPIJDyPoCxf2', NULL, '2025-08-30 13:45:42', '2025-09-02 16:33:48'),
(3, 'Admin Utama', 'admin@example.com', NULL, 'admin', NULL, '$2y$12$svuMKEMYPCKiXuDB/xjIg.0Xqke0Mvoh7WRd1qlQqaFINofPqGL7y', NULL, '2025-08-30 13:54:03', '2025-08-30 06:54:45'),
(5, 'Dr. Sakina Ali Umar Amry', 'sakina@hospital.com', '1756732492_sakina.jpeg', 'dokter', NULL, '$2y$12$yl808him2OFseAiOWO1wPumuuKWnO7JgeKqQ.ejZjcC/aY8hxeKvi', NULL, '2025-08-26 18:11:57', '2025-09-01 06:14:52'),
(6, 'Dr. Farchad Umar', 'farchad@hospital.com', NULL, 'dokter', NULL, '$2y$12$qqKGCuHXR3YxlcwFUV4Oz.wbUQ8XLWn.M6ZHWNAH3MvN/PGirZp2G', NULL, '2025-08-26 18:11:57', '2025-09-01 01:27:22'),
(11, 'Dr. Maymuna Ali Umar', 'maymuna@gmail.com', NULL, 'dokter', NULL, '$2y$12$rJapyOzejolhEX3wA5vdlO5tHc71T5WnxwDUl/Jqha3qpok7wS54q', NULL, '2025-08-26 18:11:57', '2025-09-02 05:22:46'),
(19, 'Ayu Safitri', 'safitriayuu485@gmail.com', '1756731710_ayu_saf.png', 'user', NULL, '$2y$12$QgQjUIdkr.FsaeUzBBf1rON7lYvnQYzjBWLsN4/IGgd9AQcvNxaFm', NULL, '2025-09-01 03:38:02', '2025-09-01 06:01:50'),
(23, 'pak hilal', 'pakhilal@gmail.com', '1756820305_ASSETS_IITC.png', 'user', NULL, '$2y$12$9hB30WTAdfMi5iEfkihs.uz1SHmTL1BGIBuAGxgF3zTJQsze7dn3.', NULL, '2025-09-02 06:38:16', '2025-09-02 06:38:25'),
(24, 'azka', 'azka@gmail.com', '1756826139_MA BF (1).png', 'user', NULL, '$2y$12$mD4xS24sRRO0/Aur9YpjtusgNKe9qWcbPwJGOYL8lCdelehxzNjxm', NULL, '2025-09-02 08:15:24', '2025-09-02 08:15:39'),
(26, 'umar farchad', 'umar@gmail.com', '1758635925_BUKTI.jpg', 'user', NULL, '$2y$12$anQBA50U4Md5diDHaAD3F.NRN7o/JcNm0wUXu.BmnQ1AKp97hSTOe', NULL, '2025-09-23 06:58:36', '2025-09-23 06:59:13'),
(27, 'nafsya', 'nafsya@gmail.com', '1758670295_tatabusana.jpg', 'user', NULL, '$2y$12$nNLrVQk6gY5VNaWyuUVSIuwnBrrNEpQvVuWXJ0ZJScPIHwD467s4S', NULL, '2025-09-23 16:31:28', '2025-09-23 16:31:35'),
(28, 'mara', 'mara@gmail.com', '1759411064_cycling.jpg', 'user', NULL, '$2y$12$KzlZT4TaFz/7Wm/L3.mfl.qMbNs4k/Zmc6B7wP1n2xVRxmLvfVzXK', NULL, '2025-10-02 06:17:34', '2025-10-02 06:17:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indexes for table `dokters`
--
ALTER TABLE `dokters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dokters_ruangan_id_foreign` (`ruangan_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indexes for table `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kunjungans`
--
ALTER TABLE `kunjungans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kunjungans_user_id_foreign` (`user_id`),
  ADD KEY `kunjungans_pasien_id_foreign` (`pasien_id`),
  ADD KEY `kunjungans_status_requested_date_index` (`status`,`requested_date`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pasiens`
--
ALTER TABLE `pasiens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pasiens_nomorrekammedis_unique` (`NomorRekamMedis`),
  ADD KEY `pasiens_penyakitpasien_index` (`penyakitPasien`),
  ADD KEY `pasiens_iddokter_index` (`idDokter`),
  ADD KEY `pasiens_nomorkamar_index` (`nomorKamar`),
  ADD KEY `pasiens_user_id_index` (`user_id`);

--
-- Indexes for table `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `pemeriksaans`
--
ALTER TABLE `pemeriksaans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pemeriksaans_pasien_id_foreign` (`pasien_id`),
  ADD KEY `pemeriksaans_dokter_ref_ruangan_kode_index` (`dokter_ref`,`ruangan_kode`),
  ADD KEY `pemeriksaans_kunjungan_id_foreign` (`kunjungan_id`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indexes for table `ruangan`
--
ALTER TABLE `ruangan`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ruangan_koderuangan_unique` (`kodeRuangan`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `dokters`
--
ALTER TABLE `dokters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=60;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `kunjungans`
--
ALTER TABLE `kunjungans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `pasiens`
--
ALTER TABLE `pasiens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `pemeriksaans`
--
ALTER TABLE `pemeriksaans`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ruangan`
--
ALTER TABLE `ruangan`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `dokters`
--
ALTER TABLE `dokters`
  ADD CONSTRAINT `dokters_ruangan_id_foreign` FOREIGN KEY (`ruangan_id`) REFERENCES `ruangan` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `kunjungans`
--
ALTER TABLE `kunjungans`
  ADD CONSTRAINT `kunjungans_pasien_id_foreign` FOREIGN KEY (`pasien_id`) REFERENCES `pasiens` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `kunjungans_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pasiens`
--
ALTER TABLE `pasiens`
  ADD CONSTRAINT `pasiens_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `pemeriksaans`
--
ALTER TABLE `pemeriksaans`
  ADD CONSTRAINT `pemeriksaans_kunjungan_id_foreign` FOREIGN KEY (`kunjungan_id`) REFERENCES `kunjungans` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `pemeriksaans_pasien_id_foreign` FOREIGN KEY (`pasien_id`) REFERENCES `pasiens` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
